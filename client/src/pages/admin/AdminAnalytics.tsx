import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Nouvelles 3awenis créées durant les derniers 28 jours',
    },
  },
};


export default function AdminAnalytics() {

    var dateoptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const thisWeek:any = new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
    const WeekThree:any = new Date((thisWeek - (7 * 24 * 60 * 60 * 1000)))
    const WeekTwo:any = new Date((WeekThree - (7 * 24 * 60 * 60 * 1000)))
    const WeekOne:any = new Date((WeekTwo - (7 * 24 * 60 * 60 * 1000)))
    const WeekZero: any = new Date((WeekOne - (7 * 24 * 60 * 60 * 1000)))
    const another: any = new Date((WeekOne - (7 * 24 * 60 * 60 * 1000)))
    

    const [ChartData, setChartData] = useState([])

    const data = {
        labels: [WeekZero.toLocaleDateString("fr-FR", dateoptions), WeekOne.toLocaleDateString("fr-FR", dateoptions), WeekTwo.toLocaleDateString("fr-FR", dateoptions), WeekThree.toLocaleDateString("fr-FR", dateoptions), thisWeek.toLocaleDateString("fr-FR", dateoptions)],
        datasets: [
          {
            label: 'Nouvelles 3awenis créées',
            data: ChartData,
            borderColor: '#007188',
            backgroundColor: '#007188'
          }
        ],
      };
    

    useEffect(() => {
        axios.get('/api/chart-fundraisers').then((response) => {
            const { data: { data } } = response
            console.log(data);
            
            setChartData(data)
        })
    },[])

  return (
    <main className="text-gray-600 bg-gray-100 dashboard-main-section grid grid-cols-6">
        <div className='col-span-3'>
            <Line options={options} data={data} />
        </div>
    </main>
  )
}
