import React, {Component} from 'react';
import LocationContext from '../context/location-context';

class MetadataWindow extends Component {
    static contextType = LocationContext;

    componentDidMount() {
        const co = this.context.currentDayMetadataCO;
        const co2 = this.context.currentDayMetadataCO2;
        const dust = this.context.currentDayMetadataDust;
        const humidity = this.context.currentDayMetadataHumidity;
        const temperature = this.context.currentDayMetadataTemperature;
        const smoke = this.context.currentDayMetadataSmoke;
        const lpq = this.context.currentDayMetadataLPQ;

    }

    render() {
            return (
                <React.Fragment>

                </React.Fragment>
            );
        }
    }

export default MetadataWindow;