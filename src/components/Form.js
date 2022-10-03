import React from "react";
// TODO: Create a form for create and edit
const Form = () => {
  // TODO: Make the fields into components
  const renderInputs = (obj) => {
    if (obj.type === "select") {
      return (
        <div key={obj.listkey}>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor={obj.listkey}
          >
            {obj.label}
            {obj.validator && "*"}
          </label>
          <Select
            className={`block w-full px-4 py-2 mt-2 ${
              validState.hasOwnProperty(obj.listkey)
                ? validState[obj.listkey]
                  ? "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                  : "text-red-700 bg-red-50 dark:bg-red-800 border-red-200 dark:text-red-300 dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                : "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
            }`}
            value={selectedState}
            onChange={(e) =>
              handleItemChanged(
                e,
                obj.listkey,
                dataState,
                obj.validator,
                obj.label
              )
            }
            options={obj.options}
          />
          <p className="text-red-700 text-xs">
            {errorMsg.hasOwnProperty(obj.listkey) &&
              errorMsg[obj.listkey].message}
          </p>
        </div>
      );
    }
    if (obj.hasOwnProperty("unit")) {
      if (obj.unit !== "Php") {
        return (
          <div key={obj.listkey}>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor={obj.listkey}
            >
              <span>
                {obj.label}{" "}
                <p className="inline-block text-red-700 text-sm font-bold">
                  {obj.validator && " *"}
                </p>
              </span>
            </label>
            <div className="grid grid-cols-2 gap-2 justify-items-start place-items-center">
              <input
                id={obj.listkey}
                type={obj.type}
                onChange={(e) =>
                  handleInputChange(
                    e.target.value,
                    obj.listkey,
                    dataState,
                    obj.validator,
                    obj.label
                  )
                }
                className={`block w-full px-4 py-2 mt-2  border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring ${
                  validState.hasOwnProperty(obj.listkey)
                    ? validState[obj.listkey]
                      ? "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                      : "text-red-700 bg-red-50 dark:bg-red-800 border-red-200 dark:text-red-300 dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                    : "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                }`}
              />{" "}
              {obj.unit}
            </div>
            <p className="text-red-700 text-xs">
              {errorMsg.hasOwnProperty(obj.listkey) &&
                errorMsg[obj.listkey].message}
            </p>
          </div>
        );
      } else {
        return (
          <div key={obj.listkey}>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor={obj.listkey}
            >
              <span>
                {obj.label}{" "}
                <p className="inline-block text-red-700 text-sm font-bold">
                  {obj.validator && " *"}
                </p>
              </span>
            </label>
            <div className="justify-items-start place-items-center">
              <span>
                {" "}
                {obj.unit}
                <input
                  id={obj.listkey}
                  type={obj.type}
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      obj.listkey,
                      dataState,
                      obj.validator,
                      obj.label
                    )
                  }
                  className={`inline-block w-3/5 mx-2 px-4 py-2 mt-2 border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring ${
                    validState.hasOwnProperty(obj.listkey)
                      ? validState[obj.listkey]
                        ? "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                        : "text-red-700 bg-red-50 dark:bg-red-800 border-red-200 dark:text-red-300 dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                      : "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                  }`}
                />
              </span>
              <p className="text-red-700 text-xs">
                {errorMsg.hasOwnProperty(obj.listkey) &&
                  errorMsg[obj.listkey].message}
              </p>
            </div>
          </div>
        );
      }
    }
    if (obj.listkey === "id") {
      return null;
    }
    return (
      <div key={obj.listkey}>
        <label
          className="text-gray-700 dark:text-gray-200"
          htmlFor={obj.listkey}
        >
          <span>
            {obj.label}{" "}
            <p className="inline-block text-red-700 text-sm font-bold">
              {obj.validator && " *"}
            </p>
          </span>
        </label>
        <input
          id={obj.listkey}
          onChange={(e) =>
            handleInputChange(
              e.target.value,
              obj.listkey,
              dataState,
              obj.validator,
              obj.label
            )
          }
          type="text"
          className={`block w-full px-4 py-2 mt-2  border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring ${
            validState.hasOwnProperty(obj.listkey)
              ? validState[obj.listkey]
                ? "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                : "text-red-700 bg-red-50 dark:bg-red-800 border-red-200 dark:text-red-300 dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
              : "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
          }`}
        />
        <p className="text-red-700 text-xs">
          {errorMsg.hasOwnProperty(obj.listkey) &&
            errorMsg[obj.listkey].message}
        </p>
      </div>
    );
  };

  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Add New Test
        </h2>

        <form
        // onSubmit={(e) => handleSave(e, dataState, title)}
        >
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {/* {formInputs.map((obj) => renderInputs(obj))} */}
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="block px-5 py-2 mt-5 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form;
