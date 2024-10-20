# Strava Running Analysis Manager
Hi everyone,

I'm a hobbyist runner who uses Strava to track his runs. I downloaded Strava in July 2023 and learned Google Apps Script in the spring of 2024. Technically, the project started in early June, but I only recently created the repo (thanks to the Google Apps Script GitHub Assistant Chrome extension).

As per the project, I'm using Google Apps Script to import my activity data so that I can perform custom data analysis. Currently, the project has barely started functioning (and it just has a "total distance" metric as of now), but I have some big plans for its future (e.g. graphs and charts to track my progress over time).

## Overview of Features
* API calls to Strava.com for up-to-date information (starter code from benlcollins; check oauth2.gs)
* Rudimentary caching of raw data (due to daily API call limits)
* Basic data processing (turn raw data into chronologically-ordered activities grouped via type such as Run, Walk, etc.)
