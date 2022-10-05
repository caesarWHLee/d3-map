import { useData } from "./hook/useData";
import { Marks } from "./components/Marks";

const width = 960;
const height = 500;

function App() {
  const data = useData()
  if (!data) {
    return <pre>Loading...</pre>
  }
  return (
    <svg width={width} height={height}>
      <Marks data={data} />
    </svg>
  );
}

export default App;
