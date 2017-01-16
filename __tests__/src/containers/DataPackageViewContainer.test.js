import React from "react"
import { shallow } from 'enzyme'
import DataPackageViewContainer from "../../../src/containers/DataPackageViewContainer"

const mockDescriptor = {
  "resources": [
    {
      "name": "demo-resource",
      "path": "data/demo-resource.csv",
      "format": "csv",
      "mediatype": "text/csv",
      "schema": {
        "fields": [
          {
            "name": "Date",
            "type": "date",
            "description": ""
          },
          {
            "name": "DEMOOpen",
            "type": "number",
            "description": ""
          },
          {
            "name": "DEMOHigh",
            "type": "number",
            "description": ""
          },
          {
            "name": "DEMOLow",
            "type": "number",
            "description": ""
          },
          {
            "name": "DEMOClose",
            "type": "number",
            "description": ""
          }
        ],
        "primaryKey": "Date"
      }
    }
  ],
  "views": [
    {
      "id": "Graph",
      "type": "Graph",
      "state": {
        "graphType": "lines",
        "group": "Date",
        "series": [ "DEMOClose" ]
      }
    }
  ]
}

const mockData = [
  [ '2014-01-01T18:00:00.000Z', 14.32, 14.59, 14.00, 14.23 ],
  [ '2014-01-02T18:00:00.000Z', 14.06, 14.22, 13.57, 13.76 ],
  [ '2014-01-05T18:00:00.000Z', 13.41, 14.00, 13.22, 13.55 ]
]

describe("Datapackage View Container", () => {

  const wrapper = shallow(<DataPackageViewContainer />)

  it("should render PlotlyChart component", () => {
    expect(wrapper.text()).toEqual('<PlotlyChart />')
  })

  it("should generate spec for Plotly", () => {
    let spec = wrapper.instance().generateSpec(mockDescriptor.views)
    expect(spec[0].layout.xaxis.title).toEqual('Date')
  })

  it("should convert data for Plotly", () => {
    let data = wrapper.instance().convertData(mockData, mockDescriptor)
    expect(data[0].x[0]).toEqual('2014-01-01T18:00:00.000Z')
    expect(data[0].mode).toEqual('lines')
  })

})
