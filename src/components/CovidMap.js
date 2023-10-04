import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { CovidCaseService } from "../service/CovidCaseService";
import { MapUtils } from "../utils/MapUtils";
import CovidCard from "./CovidCard";
import { mock_points } from "../data";
import cookie from "react-cookies";
import { GOOGLE_MAP_API_KEY } from '../constant';


export default function CovidMap(props) {
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

    console.log("GOOGLE_MAP_API_KEY", cookie.load(GOOGLE_MAP_API_KEY));

    return (
        // Important! Always set the container height explicitly

        <div style={{ height: '90vh', width: '100%' }}>
            <GoogleMapReact
                
                bootstrapURLKeys= {cookie.load(GOOGLE_MAP_API_KEY)}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onGoogleApiLoaded={() => {
                    const countyData = mock_points
                    const completePoints = MapUtils.convertCovidPoints(countyData);
                    setPoints(completePoints);
                    console.log(completePoints);

                    // CovidCaseService.getAllCountyCases() //promise
                    //     .then(response => {
                    //         //成功                            
                    //         // const countyData = response.data;
                    //         const countyData = mock_points
                    //         const completePoints = MapUtils.convertCovidPoints(countyData);
                    //         setPoints(completePoints);
                    //         console.log(completePoints);
                    //     })
                    //     .catch(error => {
                    //         //失敗
                    //         console.error(error);
                    //     })
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