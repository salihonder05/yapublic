import MultiSceneButtonItem from "./MultiSceneButtonItem"; 

const MultiSceneButtonList = () => {
  return (
    <div
      role="list"
      className="divide-y divide-gray-100"
    >
      {[
        { name: "andac", type: "Multiple" },
        { name: "andac", type: "Multiple" },
        { name: "andac", type: "Single" },
      ].map((item, index) => (
        <MultiSceneButtonItem key={index} item={item} />
      ))}
    </div>
  );
};

export default MultiSceneButtonList;
