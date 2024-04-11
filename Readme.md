# Backlog CLI Manager

This is a cli tool project craeted to manage tasks and backlogs on cli for developers who want quick access of all tasks while working on terminal itself.

![backlog](assets/backlog.png)

## Installation

1. Clone the repo and go to folder backlog-cli

2. ``` npm i ``` to install dependencies

3. ``` npm i -g . ``` to install cli on system

## Release: 0.0.1

## Features:

### Add backlog with name, description, priority, deadline and in todo status by default

``` backlog -a -n <name> -p <priority> -dl <deadline> -d <description> -t ```

![addTask](assets/addTask.png)

### Change status to working or completed

``` backlog -n <name> -w ```

or

``` backlog -n <name> -c ```

### Get list of all backlogs

``` backlog -la ```

![addTask](assets/list.png)

### Get list by a priority, deadline or status

``` backlog -l -p <priority> ```

or

``` backlog -l -dl <deadline> ```

or

``` backlog -l -c/w/t ```

### Remove a backlog

``` backlog -r <name> ```