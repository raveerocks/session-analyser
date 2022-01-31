# Session Analyser

The Session Analyser is used to analyse the BrowserStack Automate/AppAutomate logs.

## :pushpin: Installtion

#### :arrow_down: Clone this repository

```sh
git clone git@github.com:raveerocks/session-analyser.git
```

#### :arrow_down: Install necessary dependencies

```sh
npm install
```

## :pushpin: Commands

```sh
  config [file] [rest] [selenium]  creates a sample config file
  scan <file>                      scans the log files and prints the results
  compare <file>                   analyses the log files and prints the results
  help [command]                   display help for command
```
### :boom: config
```sh
Usage: npm run config [options] [file] [rest] [selenium]

creates a sample config file

Arguments:
  file        config file name (default: "analyse.json")
  rest        rest log file path (default: "<>")
  selenium    selenium log file path (default: "<>")
```

### :boom: scan
```sh

Usage: npm run scan [options] <file>

scans the log files and prints the results

Arguments:
  file        config file name
```
#### :zap: output

```sh
 Appium Analysis[Summary]
┌─────────────────────┬────────────────────┐
│       (index)       │       Values       │
├─────────────────────┼────────────────────┤
│      initTime       │        5906        │
│    requestCount     │         0          │
│ failedRequestCount  │         0          │
│      timeTaken      │       57891        │
│ totalProcessingTime │        6396        │
│  interRequestDelay  │       51495        │
│     inTimePerc      │ 11.048349484375809 │
│     outTimePerc     │  88.9516505156242  │
└─────────────────────┴────────────────────┘



 Appium Analysis[Details]
┌─────────┬───────────────────────────┬─────────────────────────┐
│ (index) │           POST            │           GET           │
├─────────┼───────────────────────────┼─────────────────────────┤
│   all   │ { count: 98, time: 6176 } │ { count: 7, time: 220 } │
│   url   │ { count: 1, time: 3195 }  │                         │
│  other  │ { count: 46, time: 693 }  │                         │
│  title  │                           │ { count: 1, time: 31 }  │
│ element │ { count: 51, time: 2288 } │ { count: 6, time: 189 } │
└─────────┴───────────────────────────┴─────────────────────────┘



 REST API Analysis[Summary]
┌─────────────────────┬────────────────────┐
│       (index)       │       Values       │
├─────────────────────┼────────────────────┤
│      initTime       │         0          │
│    requestCount     │         27         │
│ failedRequestCount  │         25         │
│      timeTaken      │       52988        │
│ totalProcessingTime │       12367        │
│  interRequestDelay  │       40621        │
│     inTimePerc      │ 23.339246621876654 │
│     outTimePerc     │ 76.66075337812335  │
│      stopType       │     'Graceful'     │
└─────────────────────┴────────────────────┘



 REST API Analysis[Details]
┌─────────┬────────────────────────┬────────────────────────────┐
│ (index) │          GET           │            POST            │
├─────────┼────────────────────────┼────────────────────────────┤
│   all   │ { count: 3, time: 38 } │ { count: 24, time: 12329 } │
│  other  │ { count: 1, time: 0 }  │                            │
│   url   │                        │ { count: 1, time: 10524 }  │
│  title  │ { count: 1, time: 12 } │                            │
│ element │ { count: 1, time: 26 } │ { count: 18, time: 1013 }  │
│  sync   │                        │  { count: 5, time: 792 }   │
└─────────┴────────────────────────┴────────────────────────────┘

```

### :boom: compare
```sh
Usage: npm run compare [options] <file>

analyses the log files and prints the results

Arguments:
  file        compare file name
```

#### :zap: output
```sh
Seleium Comparion Chart
┌─────────┬─────────┬──────────┬──────────────┬────────────────────┬───────────┬─────────────────────┬───────────────────┬────────────────────┬────────────────────┬───────┐
│ (index) │ session │ initTime │ requestCount │ failedRequestCount │ timeTaken │ totalProcessingTime │ interRequestDelay │     inTimePerc     │    outTimePerc     │ polls │
├─────────┼─────────┼──────────┼──────────────┼────────────────────┼───────────┼─────────────────────┼───────────────────┼────────────────────┼────────────────────┼───────┤
│    0    │    6    │          │              │                    │           │                     │                   │                    │                    │       │
│    1    │    7    │          │              │                    │           │                     │                   │                    │                    │       │
│    2    │    8    │          │              │                    │           │                     │                   │                    │                    │       │
│    3    │    9    │          │              │                    │           │                     │                   │                    │                    │       │
│    4    │   10    │          │              │                    │           │                     │                   │                    │                    │       │
│    5    │    3    │   2029   │      9       │         3          │   93206   │        77591        │       15615       │  83.2467866875523  │ 16.753213312447695 │   0   │
│    6    │    1    │   2039   │      41      │         2          │  112465   │        81023        │       31442       │ 72.04285777797537  │ 27.95714222202463  │   0   │
│    7    │    2    │   3881   │      77      │         5          │   86470   │        56635        │       29835       │ 65.49670405921128  │ 34.50329594078872  │   2   │
│    8    │    4    │   6422   │      42      │         0          │   84429   │        39738        │       44691       │ 47.066766158547416 │ 52.93323384145258  │   2   │
│    9    │    5    │   1335   │      41      │         2          │   53126   │        6035         │       47091       │ 11.359786168730942 │ 88.64021383126905  │   0   │
└─────────┴─────────┴──────────┴──────────────┴────────────────────┴───────────┴─────────────────────┴───────────────────┴────────────────────┴────────────────────┴───────┘



 REST Comparion Chart
┌─────────┬─────────┬──────────┬──────────────┬────────────────────┬───────────┬─────────────────────┬───────────────────┬────────────────────┬────────────────────┬────────────┐
│ (index) │ session │ initTime │ requestCount │ failedRequestCount │ timeTaken │ totalProcessingTime │ interRequestDelay │     inTimePerc     │    outTimePerc     │  stopType  │
├─────────┼─────────┼──────────┼──────────────┼────────────────────┼───────────┼─────────────────────┼───────────────────┼────────────────────┼────────────────────┼────────────┤
│    0    │    3    │    0     │      6       │         4          │   93085   │        84113        │       8972        │  90.3614975559972  │ 9.638502444002793  │ 'Graceful' │
│    1    │    1    │    0     │      26      │         24         │  112396   │        87696        │       24700       │  78.0241289725613  │  21.9758710274387  │ 'Graceful' │
│    2    │    2    │    0     │      46      │         5          │   87190   │        56548        │       30642       │ 64.85606147493979  │ 35.143938525060214 │ 'Graceful' │
│    3    │   10    │    0     │      52      │         1          │   46837   │        24893        │       21944       │ 53.148152101970666 │ 46.851847898029334 │ 'Graceful' │
│    4    │    4    │    0     │      27      │         0          │   85339   │        38644        │       46695       │ 45.28293043040111  │  54.7170695695989  │ 'Graceful' │
│    5    │    9    │    0     │      58      │         0          │   47267   │        18873        │       28394       │ 39.92849133645038  │ 60.07150866354962  │ 'Graceful' │
│    6    │    7    │    0     │      34      │         1          │   50009   │        11953        │       38056       │ 23.901697694415006 │  76.098302305585   │ 'Graceful' │
│    7    │    5    │    0     │      27      │         25         │   52988   │        12367        │       40621       │ 23.339246621876654 │ 76.66075337812335  │ 'Graceful' │
│    8    │    8    │    0     │      24      │         0          │   49241   │        10556        │       38685       │ 21.437420036148737 │ 78.56257996385126  │ 'Graceful' │
│    9    │    6    │    0     │      62      │         2          │   58577   │        7963         │       50614       │ 13.594072758932688 │ 86.40592724106732  │ 'Graceful' │
└─────────┴─────────┴──────────┴──────────────┴────────────────────┴───────────┴─────────────────────┴───────────────────┴────────────────────┴────────────────────┴────────────┘



 Appium Comparion Chart
┌─────────┬─────────┬──────────┬──────────────┬────────────────────┬───────────┬─────────────────────┬───────────────────┬────────────────────┬───────────────────┐
│ (index) │ session │ initTime │ requestCount │ failedRequestCount │ timeTaken │ totalProcessingTime │ interRequestDelay │     inTimePerc     │    outTimePerc    │
├─────────┼─────────┼──────────┼──────────────┼────────────────────┼───────────┼─────────────────────┼───────────────────┼────────────────────┼───────────────────┤
│    0    │    1    │          │              │                    │           │                     │                   │                    │                   │
│    1    │    2    │          │              │                    │           │                     │                   │                    │                   │
│    2    │    3    │          │              │                    │           │                     │                   │                    │                   │
│    3    │    4    │          │              │                    │           │                     │                   │                    │                   │
│    4    │    5    │          │              │                    │           │                     │                   │                    │                   │
│    5    │   10    │   5226   │      86      │         0          │   47151   │        12549        │       34602       │ 26.614493860151427 │ 73.38550613984857 │
│    6    │    6    │   5906   │      0       │         0          │   57891   │        6396         │       51495       │ 11.048349484375809 │ 88.9516505156242  │
│    7    │    8    │   5906   │      0       │         0          │   57891   │        6396         │       51495       │ 11.048349484375809 │ 88.9516505156242  │
│    8    │    9    │   5265   │      65      │         0          │   47585   │        4820         │       42765       │ 10.12924240832195  │ 89.87075759167806 │
│    9    │    7    │   6439   │      0       │         0          │   49262   │        3827         │       45435       │ 7.768665502821648  │ 92.23133449717835 │
└─────────┴─────────┴──────────┴──────────────┴────────────────────┴───────────┴─────────────────────┴───────────────────┴────────────────────┴───────────────────┘

```

