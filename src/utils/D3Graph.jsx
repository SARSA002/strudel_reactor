import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const D3Graph = ({ data }) => {
    // The SVG element for D3 to manipulate
    const svgRef = useRef(null);
    // Stores the current audio level for each instrument channel
    const [peaks, setPeaks] = useState({ 
        pulse: 0, 
        hihat: 0, 
        supersaw: 0, 
        bassline: 0, 
        melody: 0 
    });

    // Parses incoming data from console-monkey-patch and updates peaks state
    useEffect(() => {
        const newPeaks = {};

        // Data comes as array of strings: pulse:0.523
        data.forEach(entry => {
            if (typeof entry === 'string') {
                const parts = entry.split(':');
                const name = parts[0];
                const value = parseFloat(parts[1]);
                newPeaks[name] = value;
            }
        });

        setPeaks({ ...peaks, ...newPeaks });
    }, [data]);

    useEffect(() => {
        const width = 1100;
        const height = 350;
        const marginTop = 30;
        const marginRight = 160;
        const marginBottom = 50;
        const marginLeft = 160;

        const barWidth = width - marginLeft - marginRight;
        const barHeight = height - marginTop - marginBottom;

        const channels = ['pulse', 'hihat', 'supersaw', 'bassline', 'melody'];
        const channelNames = {
            pulse: 'Pµ1$Ξ_§YN7H',
            hihat: 'H1_H∆7$',
            supersaw: '5µPΞR$∆W',
            bassline: 'B∆$$_L1NΞ',
            melody: 'R∆ND0M_MΞL0D¥'
        };
        const colors = {
            pulse: '#dc3545',
            hihat: '#198754',
            supersaw: '#0e6efd',
            bassline: '#6ea8fe',
            melody: '#dee2e6'
        };

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();
        svg.attr('width', width).attr('height', height);

        const chartGroup = svg.append('g')
            .attr('transform', `translate(${marginLeft}, ${marginTop})`);

        const yScale = d3.scaleBand()
            .domain(channels)
            .range([0, barHeight])
            .padding(0.3);

        const xScale = d3.scaleLinear()
            .domain([0, 1])
            .range([0, barWidth]);

        chartGroup.append('g')
            .call(d3.axisLeft(yScale).tickFormat(d => channelNames[d]))
            .style('color', '#666');

        chartGroup.append('g')
            .attr('transform', `translate(0, ${barHeight})`)
            .call(d3.axisBottom(xScale)
                .ticks(5)
                .tickFormat(d => `${d * 100}%`))
            .style('color', '#666');

        channels.forEach(channel => {
            const value = peaks[channel] || 0;
            // Limits values to prevent bars exceeding 100%
            const maxValue = Math.min(value, 1);
            const y = yScale(channel);
            const x = 0;
            const h = yScale.bandwidth();
            const w = xScale(maxValue);

            chartGroup.append('rect')
                .attr('x', x)
                .attr('y', y)
                .attr('width', w)
                .attr('height', h)
                .attr('fill', colors[channel]);

            if (value > 0) {
                chartGroup.append('text')
                    .attr('x', w + 5)
                    .attr('y', y + h / 2 + 5)
                    .attr('text-anchor', 'start')
                    .style('font-size', '12px')
                    .style('fill', colors[channel])
                    .text(`${(maxValue * 100).toFixed(0)}%`);
            }
        });
    }, [peaks]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <svg ref={svgRef} style={{ display: 'block' }}></svg>
        </div>
    );
};

export default D3Graph;
