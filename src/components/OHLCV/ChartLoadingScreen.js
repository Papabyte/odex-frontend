// @flow
import React from 'react';
import Chart from './Chart';
import { Loading } from '../Common';
import { TypeChooser } from 'react-stockcharts/lib/helper';

type Props = {
  macd: Object,
  volume: Object,
  chartHeight: number,
  indicatorHeight: number,
  rsi: Object,
  line: Object,
  currentChart: Object,
  atr: Object,
  forceIndex: Object,
  data: Array<Object>,
};

export default class ChartLoadingScreen extends React.PureComponent<Props> {
  render() {
    const nullIndicator = { name: '', height: 0, active: false };
    const { macd, volume, chartHeight, currentChart, indicatorHeight, rsi, line, atr, forceIndex, data } = this.props;

    if (!data || data.length < 1) {
      return <Loading />;
    }
    return (
      <div className="chart-container">
        <TypeChooser>
          {type => (
            <Chart
              type={type}
              macd={macd}
              volume={volume}
              chartHeight={chartHeight}
              indicatorHeight={indicatorHeight}
              rsi={rsi}
              line={line}
              currentChart={currentChart}
              atr={atr ? atr : nullIndicator}
              forceIndex={forceIndex ? forceIndex : nullIndicator}
              data={data}
            />
          )}
        </TypeChooser>
      </div>
    );
  }
}
