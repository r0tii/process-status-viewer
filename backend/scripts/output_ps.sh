#!/bin/bash

# Remove previously created files by script
rm -rf users.txt
rm -rf ps.txt
rm -rf uid.txt

# Moving ps output to a file
ps aux >> ps.txt

# Get first column, remove header, and save usernames to a file
ps_output=$(ps aux | awk '{ print $1 }' | tail -n +2) # Strips leading whitespace when assigning to var
echo "$ps_output" >> users.txt

# Get uid of usernames from /etc/passwd and save to a file
while IFS= read -r line;
do
	cat /etc/passwd | grep "$line":x: | cut -d':' -f3 >> uid.txt
done < users.txt

# Insert UID#
sed -i '1i UID#' uid.txt

# Delete last line
sed -i '$d' uid.txt
sed -i '$d' uid.txt
sed -i '$d' uid.txt

# Append first file to second
pr -mts' ' uid.txt ps.txt
