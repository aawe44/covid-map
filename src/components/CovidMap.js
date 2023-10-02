import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { CovidCaseService } from "../service/CovidCaseService";
import { MapUtils } from "../utils/MapUtils";
import CovidCard from "./CovidCard";

export default function CovidMap() {
    const defaultProps = {
        center: {
            lat: 40,
            lng: -95
        },
        zoom: 6
    };

    const [points, setPoints] = useState({});
    const [boundary, setBoundary] = useState({});
    const [zoomLevel, setZoomLevel] = useState(defaultProps.zoom);

    const renderCovidPoints = () => {
        const covidCards = [];
        const pointLevel = MapUtils.getPointsLevelByZoomLevel(zoomLevel);
        let pointToRender = points[pointLevel];

        // Sanity Check
        if (!pointToRender) {
            return covidCards;
        }

        // Construct list of CovidCard
        if (pointLevel === 'county') {
            for (const point of pointToRender) {
                // only render visible area (within boundary) points
                if (MapUtils.isInBoundary(boundary, point.coordinates)) {
                    covidCards.push(
                        <CovidCard
                            lat={point.coordinates.latitude}
                            lng={point.coordinates.longitude}
                            title={point.county}
                            subTitle={point.province}
                            confirmed={point.stats.confirmed}
                            deaths={point.stats.deaths}
                        />
                    );
                }
            }

        } else if (pointLevel === 'state') {
            for (const state in pointToRender) {
                const point = pointToRender[state];
                if (MapUtils.isInBoundary(boundary, point.coordinates)) {
                    covidCards.push(
                        <CovidCard
                            lat={point.coordinates.latitude}
                            lng={point.coordinates.longitude}
                            title={state}
                            subTitle={point.county}
                            confirmed={point.confirmed}
                            deaths={point.deaths}
                        />
                    );
                }
            }

        } else {
            for (const nation in pointToRender) {
                const point = pointToRender[nation];
                if (MapUtils.isInBoundary(boundary, point.coordinates)) {
                    covidCards.push(
                        <CovidCard
                            lat={point.coordinates.latitude}
                            lng={point.coordinates.longitude}
                            title={nation}
                            confirmed={point.confirmed}
                            deaths={point.deaths}
                        />
                    );
                }
            }
        }

        console.log(pointToRender);

        return covidCards;
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onGoogleApiLoaded={() => {
                    CovidCaseService.getAllCountyCases() //promise
                        .then(response => {
                            //成功                            
                            const countyData = response.data;
                            const completePoints = MapUtils.convertCovidPoints(countyData);
                            setPoints(completePoints);
                            console.log(completePoints);
                        })
                        .catch(error => {
                            //失敗
                            console.error(error);
                        })
                }}

                onChange={({ center, zoom, bounds, marginBounds }) => {
                    setZoomLevel(zoom);
                    setBoundary(bounds);
                }}
            >

                {renderCovidPoints()}
            </GoogleMapReact>
        </div>
    );
}