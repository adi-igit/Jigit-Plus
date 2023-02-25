/* eslint-disable @next/next/no-img-element */
export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={'widgetLgButton ' + type}>{type}</button>;
  };

  return (
    <div className="widgetLg flex-[2] p-[20px]">
      <h3 className="widgetLgTitle text-[32px] font-[600] mb-4">
        Latest transactions
      </h3>
      <table className="widgetLgTable w-full border-spacing-[20px]">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh text-left">Customer</th>
            <th className="widgetLgTh text-left">Date</th>
            <th className="widgetLgTh text-left">Amount</th>
            <th className="widgetLgTh text-left">Status</th>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser mb-4 flex items-center font-[600]">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1173/1173817.png?w=740&t=st=1677121973~exp=1677122573~hmac=05c4c76010139fded86029b0b49a19fbd94fc1547a199f16c6573c5a99016e57"
                alt=""
                className="widgetLgImg w-[40px] h-[40px] rounded-full object-cover mt-[10px]"
              />
              <span className="widgetLgName ml-2">Susan Carol</span>
            </td>
            <td className="widgetLgDate font-[300]">2 Jun 2021</td>
            <td className="widgetLgAmount font-[300]">$122.00</td>
            <td className="widgetLgStatus">
              <Button type="Approved" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <th className="widgetLgTh text-left">Customer</th>
            <th className="widgetLgTh text-left">Date</th>
            <th className="widgetLgTh text-left">Amount</th>
            <th className="widgetLgTh text-left">Status</th>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser mb-4 flex items-center font-[600]">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1173/1173817.png?w=740&t=st=1677121973~exp=1677122573~hmac=05c4c76010139fded86029b0b49a19fbd94fc1547a199f16c6573c5a99016e57"
                alt=""
                className="widgetLgImg w-[40px] h-[40px] rounded-full object-cover mt-[10px]"
              />
              <span className="widgetLgName ml-2">Susan Carol</span>
            </td>
            <td className="widgetLgDate font-[300]">2 Jun 2021</td>
            <td className="widgetLgAmount font-[300]">$122.00</td>
            <td className="widgetLgStatus">
              <Button type="Declined" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <th className="widgetLgTh text-left">Customer</th>
            <th className="widgetLgTh text-left">Date</th>
            <th className="widgetLgTh text-left">Amount</th>
            <th className="widgetLgTh text-left">Status</th>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser mb-4 flex items-center font-[600]">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1173/1173817.png?w=740&t=st=1677121973~exp=1677122573~hmac=05c4c76010139fded86029b0b49a19fbd94fc1547a199f16c6573c5a99016e57"
                alt=""
                className="widgetLgImg w-[40px] h-[40px] rounded-full object-cover mt-[10px]"
              />
              <span className="widgetLgName ml-2">Susan Carol</span>
            </td>
            <td className="widgetLgDate font-[300]">2 Jun 2021</td>
            <td className="widgetLgAmount font-[300]">$122.00</td>
            <td className="widgetLgStatus">
              <Button type="Pending" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <th className="widgetLgTh text-left">Customer</th>
            <th className="widgetLgTh text-left">Date</th>
            <th className="widgetLgTh text-left">Amount</th>
            <th className="widgetLgTh text-left">Status</th>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser mb-4 flex items-center font-[600]">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1173/1173817.png?w=740&t=st=1677121973~exp=1677122573~hmac=05c4c76010139fded86029b0b49a19fbd94fc1547a199f16c6573c5a99016e57"
                alt=""
                className="widgetLgImg w-[40px] h-[40px] rounded-full object-cover mt-[10px]"
              />
              <span className="widgetLgName ml-2">Susan Carol</span>
            </td>
            <td className="widgetLgDate font-[300]">2 Jun 2021</td>
            <td className="widgetLgAmount font-[300]">$122.00</td>
            <td className="widgetLgStatus">
              <Button type="Approved" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
