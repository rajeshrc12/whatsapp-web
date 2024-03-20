import React, { useState } from "react";
import data from "./data/data";

const App = () => {
  const [rightPanel, setRightPanel] = useState(false);
  const [document, setDocument] = useState(false);
  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <div className="col-span-3 border">
        <div className="grid grid-rows-12 h-full">
          <div className="row-span-1 border">1</div>
          <div className="row-span-1 border">2</div>
          <div className="row-span-10 border relative overflow-y-scroll">
            <div className="absolute top-0 left-0 h-full">
              {new Array(30).fill(0).map((d) => (
                <div>hello</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`col-span-${rightPanel ? 6 : 9} border`}>
        <div className="grid grid-rows-12 h-full">
          <div className="row-span-1 border">
            <button onClick={() => setRightPanel(!rightPanel)}>
              right panel
            </button>
            <button onClick={() => setDocument(!document)}>document</button>
          </div>
          {document ? (
            <>
              <div className="row-span-11 border">
                <div className="grid grid-rows-12 h-full">
                  <div className="row-span-1 border">1</div>
                  <div className="row-span-8 border">2</div>
                  <div className="row-span-1 border bg-gray-300">
                    <div className="flex justify-center items-center h-full">
                      <input
                        type="text"
                        className="w-2/3 outline-none p-2 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="row-span-3 border">
                    <div className="grid grid-cols-12 h-full">
                      <div className="col-span-11 border relative overflow-x-scroll">
                        <div className="absolute flex top-0 left-0 h-full w-full">
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "100px",
                              gridAutoFlow: "column",
                            }}
                          >
                            {new Array(30).fill(0).map((d) => (
                              <div>hello</div>
                            ))}
                            {/* <div className="sticky bg-white top-0 right-0 border"></div> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 border">2</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row-span-10 border relative overflow-y-scroll">
                <div className="absolute top-0 left-0 h-full">
                  {new Array(30).fill(0).map((d) => (
                    <div>hello</div>
                  ))}
                </div>
              </div>
              <div className="row-span-1 border">3</div>
            </>
          )}
        </div>
      </div>
      {rightPanel && (
        <div className="col-span-3 border">
          <div className="grid grid-rows-12 h-full">
            <div className="row-span-1 border">1</div>
            <div className="row-span-11 border relative overflow-y-scroll">
              <div className="absolute top-0 left-0 h-full">
                {new Array(30).fill(0).map((d) => (
                  <div>hello</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
