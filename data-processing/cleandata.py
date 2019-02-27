#!/usr/bin/python

# file to clean up data
# TODO: 
# 1. figure out coordinates for places
# 2. new file to clean up dates

import csv
import re

with open("./hurricanesandy.csv", errors="ignore") as datafile:
    csvreader = csv.reader(datafile, delimiter=",")
    linecount = 0
    for row in csvreader:
        if linecount == 0:
            firstrow = row
            linecount += 1
        dataDate = row[0]
        dateMatch = re.match(r'\d+/\d+/\d+', dataDate)
        if dateMatch:
            dateMatchValue = dateMatch.group()
            print(dateMatchValue)
        
# with open("./cleaneddata.csv", mode="w") as cleanfile:
#     csvwriter = csv.writer(cleanfile, delimiter=",")

