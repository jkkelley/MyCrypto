import { Line } from "react-chartjs-2";

function ChartData() {

  // Local State for Chart
  const [chartData, setChartData] = useState({});
  const chart = () => {
    setChartData({
      labels: [
        "24h", "23h", "22h", "21h", "20h","19h",
        "18h", "17h", "16h", "15h", "14h", "13h",
        "12h", "11h", "10h", "9h", "8h", "7h", "6h",
        "5h", "4h", "3h", "2h", "1h", "Now"
      ],
      datasets: [
        {
          label: 'level of thiccness',
          data: [],
          backgroundColor: [`rgba(75, 192, 192, 0.6)`]
        }
      ]
    });
  };

  useEffect(() => {
    chart();
  }, []);
}

export default ChartData;
