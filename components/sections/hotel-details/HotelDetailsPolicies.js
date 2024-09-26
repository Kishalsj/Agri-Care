import { Fragment } from "react";

export default function HotelDetailsPolicies({ policies = [] }) {
  return (
    <div id="policies" className="bg-gray-100 rounded-2xl p-4">
      <div className="grid grid-flow-row md:grid-cols-2 mt-3 relative bg-white rounded-2xl shadow p-4 font-Montserrat">
        <h3 className="text-2xl font-bold mb-2">Policies</h3>

        {policies.length > 0 ? (
          <ul className="space-y-3">
            {policies.map((policy, index) => {
              return (
                <Fragment key={index}>
                  {policy.text.length > 1 ? (
                    <li className="text-justify">
                      <span className="text-[#002248] mr-2 font-bold text-[16px]">
                        {policy.type}
                      </span>
                      <span
                        className="text-[15px] text-[#5C6A7A]"
                        dangerouslySetInnerHTML={{ __html: policy.text }}
                      ></span>
                    </li>
                  ) : (
                    <></>
                  )}
                </Fragment>
              );
            })}
          </ul>
        ) : (
          <div>No Policies</div>
        )}
      </div>
    </div>
  );
}
