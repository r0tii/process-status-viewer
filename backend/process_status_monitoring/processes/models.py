from django.db import models


class Process(models.Model):
    uid = models.IntegerField(
        verbose_name="UID#",
        help_text="""A number assigned by the OS to refer to a user
                     (taken from /etc/passwd)""",
    )
    # TODO: research more (8> chars rule)
    user = models.CharField(
        max_length=80,
        verbose_name="Username or UID",
        help_text="Username (can be UID in some OS) owning the process",
    )
    pid = models.IntegerField(
        verbose_name="Procces ID", help_text="Process ID of the process"
    )
    cpu = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        verbose_name="CPU usage",
        help_text="CPU time used by this process (in percentage)",
    )
    mem = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        verbose_name="Memory usage",
        help_text="Physical memory used by this process (in percentage)",
    )
    vsz = models.IntegerField(
        verbose_name="Virtual memory size",
        help_text="Virtual memory size used by this process (in KiB)",
    )
    rss = models.IntegerField(
        verbose_name="Resident memory size",
        help_text="""Resident Set Size, the non-swappable physical
                     memory used by this process (in KiB)""",
    )
    tty = models.CharField(
        max_length=255,
        verbose_name="Controlling tty",
        help_text="""Terminal from which this process is started. Question mark (?) sign
                     represents that this process is not started from a terminal""",
    )
    stat = models.CharField(
        max_length=255, verbose_name="Process state", help_text="The process state code"
    )
    start = models.TimeField(
        verbose_name="Starting time or date",
        help_text="Starting time or date of the process",
    )
    time = models.TimeField(
        verbose_name="Cumulative CPU time",
        help_text="Cumulative CPU time",
    )
    command = models.TextField(
        verbose_name="Command",
        help_text="The command with all its arguments which started this process",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Process"
        verbose_name_plural = "Processes"

    def __str__(self):
        return f"{self.uid} - {self.user} - {self.pid}"
