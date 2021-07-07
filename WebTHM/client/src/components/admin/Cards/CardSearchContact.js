import React from "react";
export default class CardSearchContact extends React.Component {

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
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Subject</th>
                        <th className="px-4 py-2">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.dataProperties.map(item => {
                        return <tr key={item._id}>
                            {/* <td className="border px-4 py-2">{item.id}</td> */}
                            <td className="border px-4 py-2">{item.from_name}</td>
                            <td className="border px-4 py-2">{item.from_email}</td>
                            <td className="border px-4 py-2">{item.subject}</td>
                            <td className="border px-4 py-2">{item.message}</td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>
      </div>
    </>
  }
}

