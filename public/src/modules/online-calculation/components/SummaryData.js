import React from 'react'

const SummaryData = (props) => {
  return (
    <>
      <thead>
        <tr>
          <th scope='col'>{props.lenseType}</th>
          <th scope='col'>SPH</th>
          <th scope='col'>CYL</th>
          <th scope='col'>AX</th>
          <th scope='col'>PRVM</th>
          <th scope='col'>PRVA</th>
          <th scope='col'>ADD</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>{props.sph || '-'}</td>
          <td>{props.cyl || '-'}</td>
          <td>{props.ax || '-'}</td>
          <td>{props.prvm || '-'}</td>
          <td>{props.prva || '-'}</td>
          <td>{props.add || '-'}</td>
        </tr>
      </tbody>
    </>
  )
}

export default SummaryData
