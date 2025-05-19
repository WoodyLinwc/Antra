import React, {useState, useEffect} from 'react';
import data from '../data';

function Table(){
    const [info, setInfo] = useState([]);
    const [dataWithSums, setDataWithSums] = useState([]);

    useEffect(() => {

        setInfo(data);

        // calculate sums by region
        const regionSums = {};
        data.forEach(item => {
            if(!regionSums[item.region]){
                regionSums[item.region] = 0
            }
            regionSums[item.region] += item.sales;
        });
        // regionSums will be
        // {
        //     "US": 620,   
        //     "EU": 550,   
        //     "CA": 930   
        // }
        // console.log(regionSums)

        // create new array with sum rows
        const newDataWithSums = [];
        Object.keys(regionSums).forEach(region => {
            newDataWithSums.push({
                region: region,
                model: 'sum',
                sales: regionSums[region]
            });
            // { region: "US", model: "sum", sales: 620 }

            
            data.filter(item => item.region === region)
            // { region: "US", model: "A", sales: 150 }
            // { region: "US", model: "B", sales: 120 }    
            // { region: "US", model: "C", sales: 350 }   
            .forEach(item => newDataWithSums.push(item))

        });

        setDataWithSums(newDataWithSums);
        
    }, [])

    return(
        <div>
            <h2>Coding 1: Sales Data with Regional Sums</h2>
            <table style={{border: '1'}}>
                <thead>
                    <tr>
                        <th>region</th>
                        <th>model</th>
                        <th>sales</th>
                    </tr>
                </thead>
                <tbody>
                    {/* map return a new array */}
                    {dataWithSums.map((item, index) => (
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

export default Table;