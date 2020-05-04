/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MenuIcon from '../assets/menu.svg';
import {BarChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import {MenuProvider} from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const normalizedGraphData = (dataArray) => {
  //console.log(dataArray);
  let dailyConfirmedCases = [];
  let labelsData = [];
  if (dataArray) {
    let lastTenElements = dataArray.slice(Math.max(dataArray.length - 10, 0));
    //console.log(lastTenElements);
    for (let i = 0; i < lastTenElements.length; i++) {
      //console.log(lastTenElements[i]);
      dailyConfirmedCases.push(lastTenElements[i].dailyconfirmed);
      labelsData.push(lastTenElements[i].date);
    }
    return {
      labels: labelsData,
      datasets: [
        {
          data: dailyConfirmedCases,
        },
      ],
    };
  }
};

const normalizedGraphDataforStates = (
  dataArray,
  type = 'Confirmed',
  stateLocation = 'tt',
) => {
  //console.log(dataArray);
  let finalStateLocation = stateLocation.toLocaleLowerCase();
  let dailyConfirmedCases = [];
  let labelsData = [];
  if (dataArray) {
    let dailyConfirmedCasesFiltered = dataArray.filter(
      (item) => item.status === type,
    );
    let lastTenElements = dailyConfirmedCasesFiltered.slice(
      Math.max(dailyConfirmedCasesFiltered.length - 10, 0),
    );
    //console.log(lastTenElements);
    for (let i = 0; i < lastTenElements.length; i++) {
      //console.log(lastTenElements[i][finalStateLocation]);
      dailyConfirmedCases.push(lastTenElements[i][finalStateLocation]);
      labelsData.push(lastTenElements[i].date);
    }
    return {
      labels: labelsData,
      datasets: [
        {
          data: dailyConfirmedCases,
        },
      ],
    };
  }
};

const chartConfig = {
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 89, 89, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(153, 159, 191, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '1',
    stroke: '#ffa726',
  },
  barPercentage: 0.3,
  formatYLabel: (ylabel) => numberToCommas(ylabel),
  formatXLabel: (xlabel) => xlabel.slice(0, 6),
};

const graphStyle = {
  marginVertical: 8,
  borderRadius: 16,
  barRadius: 4,
  backgroundColor: '#FFFFFF',
};

const statesArray = [
  {state: 'India', statecode: 'TT'},
  {state: 'Maharashtra', statecode: 'MH'},
  {state: 'Gujarat', statecode: 'GJ'},
  {state: 'Delhi', statecode: 'DL'},
  {state: 'Madhya Pradesh', statecode: 'MP'},
  {state: 'Rajasthan', statecode: 'RJ'},
  {state: 'Tamil Nadu', statecode: 'TN'},
  {state: 'Uttar Pradesh', statecode: 'UP'},
  {state: 'Andhra Pradesh', statecode: 'AP'},
  {state: 'Telangana', statecode: 'TG'},
  {state: 'West Bengal', statecode: 'WB'},
  {state: 'Jammu and Kashmir', statecode: 'JK'},
  {state: 'Karnataka', statecode: 'KA'},
  {state: 'Kerala', statecode: 'KL'},
  {state: 'Bihar', statecode: 'BR'},
  {state: 'Punjab', statecode: 'PB'},
  {state: 'Haryana', statecode: 'HR'},
  {state: 'Odisha', statecode: 'OR'},
  {state: 'Jharkhand', statecode: 'JH'},
  {state: 'Chandigarh', statecode: 'CH'},
  {state: 'Uttarakhand', statecode: 'UT'},
  {state: 'Himachal Pradesh', statecode: 'HP'},
  {state: 'Assam', statecode: 'AS'},
  {state: 'Chhattisgarh', statecode: 'CT'},
  {state: 'Andaman & Nicobar', statecode: 'AN'},
  {state: 'Ladakh', statecode: 'LA'},
  {state: 'Meghalaya', statecode: 'ML'},
  {state: 'Puducherry', statecode: 'PY'},
  {state: 'Goa', statecode: 'GA'},
  {state: 'Manipur', statecode: 'MN'},
  {state: 'Tripura', statecode: 'TR'},
  {state: 'Mizoram', statecode: 'MZ'},
  {state: 'Arunachal Pradesh', statecode: 'AR'},
  {state: 'Nagaland', statecode: 'NL'},
  {state: 'Dadra & Nagar Haveli', statecode: 'DN'},
  {state: 'Daman and Diu', statecode: 'DD'},
  {state: 'Lakshadweep', statecode: 'LD'},
  {state: 'Sikkim', statecode: 'SK'},
];

const numberToCommas = (num) => {
  if (num) {
    try {
      /*  let numToSend = Number(num).toLocaleString();
      return numToSend; */

      return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } catch (err) {
      console.log(err);
      return num;
    }
  }
};

const Statistics = ({navigation}) => {
  const [selectedState, setSelectedState] = useState({
    state: 'India',
    statecode: 'TT',
  });

  const [graphData, setGraphData] = useState({
    labels: ['Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5', 'Apr 6'],
    datasets: [
      {
        data: [0, 5000, 10000, 8000, 9900, 4003],
      },
    ],
  });

  const changeDate = (date) => {
    //console.log(date);
    setSelectedDate(date);
    setRealTimeStats(rawData, date, selectedState);
  };

  const [selectedDate, setSelectedDate] = useState('total');
  const [rawData, setRawData] = useState({});
  const [statesDailyRawData, setStatesDailyRawData] = useState({});
  const [statesDailyTestsRawData, setStatesDailyTestsRawData] = useState({});
  const [totalAffected, setTotalAffected] = useState('');
  const [totalDeaths, setTotalDeaths] = useState('');
  const [totalRecovered, setTotalRecovered] = useState('');
  const [totalActive, setTotalActive] = useState('');
  const [totalTests, setTotalTests] = useState('');

  const setRealTimeStats = (dataArray, date, stateLocation) => {
    console.log(date);
    console.log(stateLocation);
    if (dataArray) {
      switch (date) {
        case 'total':
          if (dataArray.statewise) {
            if (stateLocation) {
              for (const x of dataArray.statewise) {
                if (x.statecode === stateLocation.statecode) {
                  setTotalAffected(numberToCommas(x.confirmed));
                  setTotalDeaths(numberToCommas(x.deaths));
                  setTotalRecovered(numberToCommas(x.recovered));
                  setTotalActive(numberToCommas(x.active));
                }
              }
            }
          }
          if (dataArray.tested) {
            if (
              stateLocation &&
              stateLocation.statecode !== 'TT' &&
              statesDailyTestsRawData &&
              statesDailyTestsRawData.states_tested_data
            ) {
              let filteredStateTestData = statesDailyTestsRawData.states_tested_data.filter(
                (item) => item.state === stateLocation.state,
              );
              let lastElement = filteredStateTestData.length - 1;
              if (
                filteredStateTestData &&
                filteredStateTestData[lastElement] &&
                filteredStateTestData[lastElement].totaltested
              ) {
                console.log(stateLocation);
                console.log(filteredStateTestData[lastElement].totaltested);
                setTotalTests(
                  numberToCommas(
                    filteredStateTestData[lastElement].totaltested,
                  ),
                );
              }
            } else {
              let lastElement = dataArray.tested.length - 1;
              setTotalTests(
                numberToCommas(
                  dataArray.tested[lastElement].totalsamplestested,
                ),
              );
            }
          }

          break;
        case 'today':
          if (dataArray.statewise) {
            if (stateLocation) {
              for (const x of dataArray.statewise) {
                if (x.statecode === stateLocation.statecode) {
                  setTotalAffected(numberToCommas(x.deltaconfirmed));
                  setTotalDeaths(numberToCommas(x.deltadeaths));
                  setTotalRecovered(numberToCommas(x.deltarecovered));
                  setTotalActive(numberToCommas(x.active));
                }
              }
            }
          }
          if (dataArray.tested) {
            if (
              stateLocation &&
              stateLocation.statecode !== 'TT' &&
              statesDailyTestsRawData &&
              statesDailyTestsRawData.states_tested_data
            ) {
              let filteredStateTestData = statesDailyTestsRawData.states_tested_data.filter(
                (item) => item.state === stateLocation.state,
              );
              let lastElement = filteredStateTestData.length - 1;
              if (
                filteredStateTestData &&
                filteredStateTestData[lastElement] &&
                filteredStateTestData[lastElement].totaltested
              ) {
                console.log(stateLocation);
                console.log(filteredStateTestData[lastElement].totaltested);
                setTotalTests(
                  numberToCommas(
                    filteredStateTestData[lastElement].totaltested,
                  ),
                );
              }
            } else {
              let lastElement = dataArray.tested.length - 1;
              let todaysTests = Number(
                dataArray.tested[lastElement].totalsamplestested -
                  dataArray.tested[lastElement - 1].totalsamplestested,
              );
              setTotalTests(numberToCommas(todaysTests));
            }
          }

          break;

        case 'yesterday':
          //not state wise, need to change it to state wise
          if (dataArray.cases_time_series) {
            let lastElement = dataArray.cases_time_series.length - 1;
            setTotalAffected(
              numberToCommas(
                dataArray.cases_time_series[lastElement].dailyconfirmed,
              ),
            );
            setTotalDeaths(
              numberToCommas(
                dataArray.cases_time_series[lastElement].dailydeceased,
              ),
            );
            setTotalRecovered(
              numberToCommas(
                dataArray.cases_time_series[lastElement].dailyrecovered,
              ),
            );
            setTotalActive(numberToCommas(dataArray.statewise[0].active));
          }
          if (dataArray.tested) {
            if (
              stateLocation &&
              stateLocation.statecode !== 'TT' &&
              statesDailyTestsRawData &&
              statesDailyTestsRawData.states_tested_data
            ) {
              let filteredStateTestData = statesDailyTestsRawData.states_tested_data.filter(
                (item) => item.state === stateLocation.state,
              );
              let lastElement = filteredStateTestData.length - 1;
              if (
                filteredStateTestData &&
                filteredStateTestData[lastElement] &&
                filteredStateTestData[lastElement].totaltested
              ) {
                console.log(stateLocation);
                console.log(filteredStateTestData[lastElement].totaltested);
                setTotalTests(
                  numberToCommas(
                    filteredStateTestData[lastElement].totaltested,
                  ),
                );
              }
            } else {
              let lastButOneElement = dataArray.tested.length - 2;
              let yesterdaysTests = Number(
                dataArray.tested[lastButOneElement].totalsamplestested -
                  dataArray.tested[lastButOneElement - 1].totalsamplestested,
              );
              setTotalTests(numberToCommas(yesterdaysTests));
            }
          }

          break;
        default:
          if (dataArray.statewise) {
            setTotalAffected(numberToCommas(dataArray.statewise[0].confirmed));
            setTotalDeaths(numberToCommas(dataArray.statewise[0].deaths));
            setTotalRecovered(numberToCommas(dataArray.statewise[0].recovered));
            setTotalActive(numberToCommas(dataArray.statewise[0].active));
          }
          if (dataArray.tested) {
            let lastElement = dataArray.tested.length - 1;
            setTotalTests(
              numberToCommas(dataArray.tested[lastElement].totalsamplestested),
            );
          }
          break;
      }
    }
  };

  useEffect(() => {
    Axios.get('https://api.covid19india.org/data.json').then((res) => {
      if (res.status === 200) {
        console.log('got national level data');
        setRawData(res.data);
        //let responseData = normalizedGraphData(res.data.cases_time_series);
        //console.log(responseData);
        //setGraphData(responseData);
        setRealTimeStats(res.data, selectedDate, selectedState);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get('https://api.covid19india.org/states_daily.json').then((res) => {
      if (res.status === 200) {
        console.log('got state level daily data');
        setStatesDailyRawData(res.data);
        let responseData = normalizedGraphDataforStates(res.data.states_daily);
        //console.log(responseData);
        setGraphData(responseData);
        //setRealTimeStats(res.data, selectedDate, selectedState);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get('https://api.covid19india.org/state_test_data.json').then(
      (res) => {
        if (res.status === 200) {
          console.log('got state level test data');
          setStatesDailyTestsRawData(res.data);

          //setRealTimeStats(res.data, selectedDate, selectedState);
        }
      },
    );
  }, []);

  return (
    <MenuProvider>
      <ScrollView style={{backgroundColor: '#473F97'}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <MenuIcon
              style={styles.headerIcons}
              onPress={() => navigation.openDrawer()}
            />
            <Ionicons
              name="ios-information-circle-outline"
              size={30}
              onPress={() => navigation.navigate('Info')}
              style={{...styles.headerIcons, color: '#FFF', marginTop: -10}}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.headerText}>Statistics</Text>
            <Menu
              style={{marginTop: 40, marginHorizontal: 24}}
              onSelect={(value) => {
                setSelectedState(value);
                setRealTimeStats(rawData, selectedDate, value);
                let responseData = normalizedGraphDataforStates(
                  statesDailyRawData.states_daily,
                  'Confirmed',
                  value.statecode,
                );
                console.log(responseData);
                setGraphData(responseData);
                //alert(`Selected State: ${value}`);
              }}>
              <MenuTrigger>
                <View
                  style={{
                    backgroundColor: '#FFF',
                    borderRadius: 50,
                    flexDirection: 'row',
                  }}>
                  <Text style={{padding: 10, paddingStart: 20}}>
                    {selectedState && selectedState.state}
                  </Text>
                  <Icon
                    name="sort-down"
                    style={{paddingVertical: 10, paddingEnd: 10}}
                    size={16}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions>
                <ScrollView style={{maxHeight: 300}}>
                  {statesArray.map((state) => (
                    <MenuOption value={state} key={state.statecode}>
                      <Text>{state.state}</Text>
                    </MenuOption>
                  ))}
                </ScrollView>
              </MenuOptions>
            </Menu>
          </View>

          <View style={styles.dates}>
            <TouchableOpacity onPress={() => changeDate('total')}>
              <Text
                style={{
                  opacity: selectedDate && selectedDate === 'total' ? 1 : 0.5,
                  color: '#FFF',
                }}>
                Total
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeDate('today')} opa>
              <Text
                style={{
                  opacity: selectedDate && selectedDate === 'today' ? 1 : 0.5,
                  color: '#FFF',
                }}>
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                changeDate('yesterday');
              }}
              disabled={selectedState.statecode === 'TT' ? false : true}>
              <Text
                style={{
                  opacity:
                    selectedDate && selectedDate === 'yesterday' ? 1 : 0.5,
                  color: '#FFF',
                }}>
                Yesterday
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 24,
              justifyContent: 'center',
              marginTop: 24,
            }}>
            <View style={styles.bigCard}>
              <Text style={styles.bigCardTitle}>Affected</Text>
              <Text style={styles.bigCardValue}>{totalAffected}</Text>
            </View>

            <View
              style={{
                ...styles.bigCard,
                backgroundColor: '#FF5959',
                marginLeft: 2,
                marginRight: null,
              }}>
              <Text style={styles.bigCardTitle}>Death</Text>
              <Text style={styles.bigCardValue}>{totalDeaths}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 24,
              justifyContent: 'space-evenly',
              marginTop: 24,
            }}>
            <View style={{...styles.bigCard, backgroundColor: '#4CD97B'}}>
              <Text style={styles.bigCardTitle}>Recovered</Text>
              <Text style={styles.bigCardValue}>{totalRecovered}</Text>
            </View>

            <View style={{...styles.bigCard, backgroundColor: '#4DB5FF'}}>
              <Text style={styles.bigCardTitle}>Active</Text>
              <Text style={styles.bigCardValue}>{totalActive}</Text>
            </View>

            <View
              style={{
                ...styles.bigCard,
                backgroundColor: '#9059FF',

                marginRight: null,
              }}>
              <Text style={styles.bigCardTitle}>Tests</Text>
              <Text style={styles.bigCardValue}>{totalTests}</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#FFF',
            borderTopStartRadius: 40,
            borderTopEndRadius: 40,
            padding: 24,
            height: 300,
          }}>
          <Text style={{fontSize: 20}}>Daily New Cases</Text>
          <BarChart
            style={graphStyle}
            data={graphData}
            width={screenWidth - 48}
            height={240}
            chartConfig={chartConfig}
            verticalLabelRotation={20}
          />
        </View>
      </ScrollView>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 54,
    paddingBottom: 60,
    flex: 0.4,
    backgroundColor: '#473F97',
  },
  preventionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    marginHorizontal: 24,
    fontSize: 24,
    color: '#FFF',
    marginTop: 40,
    fontWeight: '600',
  },
  headerIcons: {
    marginHorizontal: 24,
  },
  h2: {
    marginHorizontal: 24,
    fontSize: 20,
    color: '#FFF',
    marginTop: 40,
  },
  para: {
    marginHorizontal: 24,
    fontSize: 14,
    color: '#FFF',
    marginTop: 12,
    opacity: 0.8,
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
  datesText: {
    color: '#FFF',
  },
  bigCard: {
    backgroundColor: '#FFB259',
    height: 100,
    flexGrow: 1,
    marginRight: 8,
    borderRadius: 8,
  },
  bigCardTitle: {color: '#fff', paddingLeft: 12, paddingTop: 14},
  bigCardValue: {
    color: '#fff',
    fontSize: 24,
    marginTop: 20,
    paddingLeft: 12,
  },
});

export default Statistics;
