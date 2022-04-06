from typing import List, Dict
import subprocess

from django.core.management.base import BaseCommand

from process_status_monitoring.processes.models import Process


class Command(BaseCommand):
    help = """Fetches the output from the `output_ps` bash script,
              parses the str data
              and saves into db."""

    def handle(self, *args, **options):
        ps = subprocess.run(["./scripts/output_ps.sh"], check=True, capture_output=True)
        output = subprocess.run(
            ["sed", "-e", "s/\\s\\+/-|-/g", "-e", "s/$/\\n/"],
            input=ps.stdout,
            capture_output=True,
        ).stdout.decode("utf-8")
        self.save_to_db(self.parse_output(output))

    def parse_output(self, output: str) -> List[Dict[str, str]]:
        """
        Parses the output of `output_ps` bash script into a list[dict], each dict
        representing the parsed process information from each row of the output.

        Keys are mapped to Process model field names, parsed from the first line of
        the process output.
        """

        output = list(filter(None, output.replace("\n", "-|-").split("-|-")))
        headers = [h.replace("#", "").replace("%", "").lower() for h in output[0:12]]
        headers_len = len(headers)
        ps_rows = []
        command_str = ""
        counter = 0

        # FIXME: Bugprone/hackish method to parse and concat parts of command
        # after spliting the str
        for v in output[headers_len:]:
            if counter >= headers_len - 1:
                try:
                    int(v)
                except ValueError:
                    command_str += f" {v}"
                else:
                    ps_rows.append(command_str.strip())
                    ps_rows.append(v)
                    counter = 0
                    command_str = ""
            else:
                ps_rows.append(v)
            if v == output[-1]:
                ps_rows.append(command_str.strip())
            counter += 1

        raw_data = [
            *[ps_rows[i : i + headers_len] for i in range(0, len(ps_rows), headers_len)]
        ]
        return [{headers[i]: v for i, v in enumerate(r)} for r in raw_data]

    def save_to_db(self, parsed_output: List[Dict[str, str]]) -> None:
        """
        Stores parsed output into db.
        """
        # Bulk saving (1 query), due to performance and speed
        Process.objects.bulk_create([Process(**r) for r in parsed_output])
