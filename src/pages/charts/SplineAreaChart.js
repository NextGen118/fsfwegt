// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

// SplineAreaChart
const SplineAreaChart = () => {
    const apexAreaChart1Opts = {
        chart: {
            height: 380,
            type: 'area',
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 3,
            curve: 'smooth',
        },
        colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3', '#ffbe0b'],
        legend: {
            offsetY: -10,
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        tooltip: {
            theme: 'dark',
            x: { show: false },
            fixed: {
                enabled: false,
                position: 'topRight',
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
        },
    };

    const apexAreaChart1Data = [
        {
            name: 'Series 1',
            data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
            name: 'Series 2',
            data: [11, 32, 45, 32, 34, 52, 41],
        },
    ];

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-3">Spline Area</h4>
                <Chart options={apexAreaChart1Opts} series={apexAreaChart1Data} type="area" className="apex-charts" />
            </CardBody>
        </Card>
    );
};

export default SplineAreaChart;
