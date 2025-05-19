import React, {useState,useEffect} from 'react';
import data from '../data';

function FilteredTable(){
    const [info, setInfo] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState([]);

    const [regionFilter, setRegionFilter] = useState('all');
    const [modelFilter, setModelFilter] = useState('all');
    const [regions, setRegions] = useState([]);
    const [models, setModels] = useState([]);

    useEffect(() => {
        setInfo(data);
        setFilteredInfo(data);

        // get unique regions and models for filters
        const uniqueRegions = [...new Set(data.map(item => item.region))];
        // ["US", "EU", "CA"]
        const uniqueModels = [...new Set(data.map(item => item.model))];
        // ["A", "B", "C", "D"]
        
        setRegions(uniqueRegions);
        setModels(uniqueModels);
    },[])


    useEffect(() => {
        let result = info;

        if(regionFilter !== "all"){
            result = result.filter(item => item.region === regionFilter);
        }

        if(modelFilter !== "all"){
            result = result.filter(item => item.model === modelFilter);
        }

        setFilteredInfo(result)

    }, [regionFilter, modelFilter, info])


    const handleRegionFilterChange = (e) => {
        setRegionFilter(e.target.value);
    }

    const handleModelFilterChange = (e) => {
        setModelFilter(e.target.value);
    }

    return (
        <div>
            <h2>Coding 2: Filtered Sales Data</h2>

            <div>
                <label>Region Filter:</label>
                <select value={regionFilter} onChange={handleRegionFilterChange}>
                    <option value="all">all</option>
                    {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>

                <label>Model Filter:</label>
                <select value={modelFilter} onChange={handleModelFilterChange}>
                    <option value="all">all</option>
                    {models.map(model => (
                        <option key={model} value={model}>{model}</option>
                    ))}
                </select>
            </div>

            <table>
                <thead>
                        <tr>
                            <th>region</th>
                            <th>model</th>
                            <th>sales</th>
                        </tr>
                </thead>
                <tbody>
                        {filteredInfo.map((item, index) => (
                            <tr key={index}>
                                <td>{item.region}</td>
                                <td>{item.model}</td>
                                <td>{item.sales}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default FilteredTable;