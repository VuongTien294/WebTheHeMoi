import React from "react";
import { Link } from 'react-router-dom';


export default class CardSearchCategory extends React.Component {

  render(){
    return <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded  " 
          +("bg-white")
        }
      >
        <div>
            <table className="table-auto">
                <thead>
                    <tr>
                        {/* <th className="px-4 py-2">Id</th> */}
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.dataProperties.map(item => {
                        return <tr key={item._id}>
                            {/* <td className="border px-4 py-2">{item.id}</td> */}
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">
                                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type="button"><Link to={"/admin/category/update/" + item._id}><i className="fas fa-tools mr-2 text-sm"></i></Link></button>
                                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type="button" onClick={()=>{this.props.deleteProperties(item._id)}}><i className="fas fa-trash-alt  mr-2 text-sm"></i></button>
                                {/* <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type="button"><Link to={"/admin/category/view/" + item.id}><i className="fas fa-align-justify"></i></Link></button>                     */}
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
      </div>
    </>
  }
}

