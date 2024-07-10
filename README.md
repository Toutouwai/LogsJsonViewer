# Logs JSON Viewer

Formats JSON data in ProcessLogger for improved readability.

Because log files can only contain strings, it's a common practice to use `json_encode()` to convert an array to a string when you want to save the data to a log file.

But the resulting JSON is not as readable as it could be when viewing the log in ProcessLogger. The Logs JSON Viewer module uses the [json-viewer](https://github.com/andypf/json-viewer/) library to improve the readability of JSON data in ProcessLogger and add some useful features.

Before:
![ljv-1](https://github.com/Toutouwai/CustomLogs/assets/1538852/a5f6d9ba-2ea8-45f8-9799-0bf07088d848)

After:
![ljv-2](https://github.com/Toutouwai/CustomLogs/assets/1538852/ab45e02e-5d36-4667-a5bf-849e9517ca42)

## Configuration

You can set the config options for json-viewer in a textarea field. See the [json-viewer readme](https://github.com/andypf/json-viewer/?tab=readme-ov-file#options) for information about the options.

There is also an option to set the width of the column that contains the JSON data. This setting exists because otherwise the column jumps around in an inconsistent and distracting way when changing from log to log or between paginations.

## Features

You can switch the view of the JSON data between formatted and unformatted using the toggle button at the bottom of the data.

The viewer has a number of useful features such as:

* Progressively expand or collapse levels in the data.
* View the count of child items and the data type of each item.
* Search for a string within the data.
* Copy all or part of the data to the clipboard (requires the HTTPS protocol).
