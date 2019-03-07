#!/usr/bin/python

# file to parse data for graph from data.csv

import csv
import re

nodearray = []
sandylinkarray = []
nyclinkarray = []
njlinkarray = []
sandypetslinkarray = []
frankenstormlinkarray = []
hurricanesandylinkarray = []
with open("data.csv", errors="ignore") as datafile:
    csvreader = csv.reader(datafile, delimiter=",")
    linecount = 0
    for row in csvreader:
        if linecount == 0:
            firstrow = row
            linecount += 1
        tweet = row[7].lower()
        user = row[5]
        nodearray.append({
            "id": row[5],
            "group": 0,
            "label": row[5],
            "level": 0
        })

        strength = 0.5
        if linecount % 2 == 0:
            strength = 0.7
        if linecount % 3 == 0:
            strength = 0.8

        if "#sandy" in tweet:
            sandylinkarray.append({
                "target": "sandy",
                "source": user,
                "strength": strength
            })
        
        if "#nyc" in tweet:
            nyclinkarray.append({
                "target": "nyc",
                "source": user,
                "strength": strength
            })
        
        if "#nj" in tweet:
            njlinkarray.append({
                "target": "nj",
                "source": user,
                "strength": strength
            })

        if "#sandypets" in tweet:
            sandypetslinkarray.append({
                "target": "sandypets",
                "source": user,
                "strength": strength
            })
        
        if "#frankenstorm" in tweet:
            frankenstormlinkarray.append({
                "target": "frankenstorm",
                "source": user,
                "strength": strength
            })
        if "#hurricanesandy" in tweet:
            hurricanesandylinkarray.append({
                "target": "hurricanesandy",
                "source": user,
                "strength": strength
            })
        

        linecount += 1
print(hurricanesandylinkarray)
            
        