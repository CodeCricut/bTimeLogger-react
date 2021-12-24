# Test Results

**Last run**: 12/24/2021 at 12:27 AM (commit d60244ba88a9154b6e780e097a4ea30899ae36b9)

## Results

Test Suites: 4 failed, 8 passed, 12 total

Tests: 11 failed, 136 passed, 147 total

Snapshots: 0 total

Time: 6.946 s

## Coverage

| File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                      |
| ------------------------- | ------- | -------- | ------- | ------- | -------------------------------------- |
| All files                 | 49.38   | 42.85    | 40.41   | 51.63   |
| src                       | 0       | 100      | 100     | 0       |
| config.js                 | 0       | 100      | 100     | 0       | 4-7                                    |
| index.js                  | 0       | 100      | 100     | 0       | 8                                      |
| src/activities            | 92.16   | 77.33    | 98.14   | 97.91   |
| ActivityContext.js        | 100     | 100      | 100     | 100     |
| ActivityModel.js          | 96.55   | 100      | 83.33   | 96.15   | 74                                     |
| ActivityRepository.js     | 82.6    | 70.73    | 100     | 100     | 30-42,59,80,93,106,121,134,148-150,163 |
| useActivityReducer.js     | 93.75   | 81.81    | 100     | 96.55   | 108                                    |
| useActivityRepository.js  | 97.53   | 57.14    | 100     | 97.53   | 23,51                                  |
| src/activity-types        | 90.37   | 69.04    | 97.05   | 96.61   |
| ActivityTypeContext.js    | 100     | 100      | 100     | 100     |
| ActivityTypeModel.js      | 93.75   | 100      | 75      | 92.3    | 27                                     |
| ActivityTypeRepository.js | 70.37   | 55.55    | 100     | 100     | 19-47,61-74                            |
| useTypeReducer.js         | 93.75   | 81.81    | 100     | 96.55   | 106                                    |
| useTypeRepository.js      | 96.29   | 57.14    | 100     | 96.22   | 25,49                                  |
| src/components            | 3.6     | 5.26     | 2.32    | 3.72    |
| Activity.js               | 0       | 100      | 0       | 0       | 9-47                                   |
| ActivityForm.js           | 0       | 0        | 0       | 0       | 20-133                                 |
| ActivityList.js           | 0       | 0        | 0       | 0       | 13-22                                  |
| ActivityTimes.js          | 0       | 0        | 0       | 0       | 6-22                                   |
| ActivityTypeHeader.js     | 0       | 0        | 0       | 0       | 5-21                                   |
| ActivityTypeSelect.js     | 0       | 0        | 0       | 0       | 4-35                                   |
| App.js                    | 0       | 100      | 0       | 0       | 14                                     |
| AppBarHeader.js           | 0       | 100      | 0       | 0       | 6-18                                   |
| AppBarSearchBox.js        | 0       | 0        | 0       | 0       | 9-92                                   |
| AppDrawer.js              | 0       | 100      | 0       | 0       | 12-25                                  |
| AppDrawerItems.js         | 0       | 100      | 0       | 0       | 3-7                                    |
| CompletedActivity.js      | 0       | 100      | 0       | 0       | 8-19                                   |
| CompletedActivityMenu.js  | 0       | 0        | 0       | 0       | 11-50                                  |
| Duration.js               | 0       | 100      | 0       | 0       | 5-19                                   |
| FilteredActivityList.js   | 0       | 100      | 0       | 0       | 12-20                                  |
| InlineStartActivity.js    | 0       | 0        | 0       | 0       | 12-75                                  |
| Layout.js                 | 0       | 100      | 0       | 0       | 19-63                                  |
| MakeActivityDialog.js     | 0       | 0        | 0       | 0       | 18-96                                  |
| MenuDropdown.js           | 63.63   | 100      | 40      | 63.63   | 26-27,34-37                            |
| SearchAppBar.js           | 0       | 100      | 0       | 0       | 17-76                                  |
| SettingsButton.js         | 0       | 100      | 0       | 0       | 5-12                                   |
| StartedActivity.js        | 0       | 100      | 0       | 0       | 10-23                                  |
| StartedActivityMenu.js    | 0       | 100      | 0       | 0       | 7-19                                   |
| TuneSearchDialog.js       | 0       | 100      | 0       | 0       | 25-39                                  |
| TuneSearchForm.js         | 0       | 0        | 0       | 0       | 18-115                                 |
| src/hooks                 | 0       | 0        | 0       | 0       |
| useActivityFormState.js   | 0       | 100      | 0       | 0       | 9-42                                   |
| useActivitySearch.js      | 0       | 0        | 0       | 0       | 12-67                                  |
| useDate.js                | 0       | 100      | 0       | 0       | 3-13                                   |
| useFetchTypeHook.js       | 0       | 100      | 0       | 0       | 3-29                                   |
| useFilteredActivities.js  | 0       | 100      | 0       | 0       | 11-16                                  |
| useSearchParams.js        | 0       | 100      | 0       | 0       | 8-13                                   |
| useTuneFormState.js       | 0       | 0        | 0       | 0       | 7-43                                   |
| src/model                 | 77.77   | 50       | 75      | 86.95   |
| SearchParams.js           | 77.77   | 50       | 75      | 86.95   | 18,28,43                               |
| src/style                 | 0       | 0        | 0       | 0       |
| ThemeSwitcherContext.js   | 0       | 0        | 0       | 0       | 6-26                                   |
| formStyles.js             | 0       | 0        | 0       | 0       |
| theme.js                  | 0       | 100      | 100     | 0       | 3-56                                   |
| src/test-helpers/fixtures | 100     | 100      | 100     | 100     |
| activities.js             | 100     | 100      | 100     | 100     |
| activity-types.js         | 100     | 100      | 100     | 100     |
| dates.js                  | 100     | 100      | 100     | 100     |
| src/test-helpers/util     | 91.3    | 50       | 100     | 90.47   |
| expect-helpers.js         | 91.3    | 50       | 100     | 90.47   | 10,28                                  |
| src/util                  | 9.89    | 4.76     | 5.71    | 13.23   |
| activity-selectors.js     | 0       | 0        | 0       | 0       | 10-160                                 |
| date-helpers.js           | 100     | 100      | 100     | 100     |
| timeFormatters.js         | 44.44   | 100      | 0       | 66.66   | 4-8                                    |
