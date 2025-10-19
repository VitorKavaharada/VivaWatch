import styles from "./Dashboard.module.css";
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,PieChart,Pie,Cell,BarChart,Bar,ResponsiveContainer,} from "recharts";
import {FaHeart,FaWalking,FaBatteryThreeQuarters,FaMapMarkerAlt,FaFileAlt,FaHeartbeat,FaStopwatch } from "react-icons/fa";
import { SiOxygen } from "react-icons/si";
import { GiNetworkBars } from "react-icons/gi";

// Dados estaticos para simular
const heartRateData = [
  { id: 1, time: "00:00", bpm: 60 },
  { id: 2, time: "04:00", bpm: 65 },
  { id: 3, time: "08:00", bpm: 70 },
  { id: 4, time: "12:00", bpm: 75 },
  { id: 5, time: "16:00", bpm: 72 },
  { id: 6, time: "20:00", bpm: 68 },
];

const activityData = [
  {  id: 1, name: "Ativo", percent: 0.4 },
  {  id: 2, name: "Inativo", percent: 0.6 },
];

const fallsData = [
  {  id: 1, period: "Seg", Quedas: 1 },
  {  id: 2, period: "Ter", Quedas: 0 },
  {  id: 3, period: "Qua", Quedas: 2 },
  {  id: 4, period: "Qui", Quedas: 1 },
  {  id: 5, period: "Sex", Quedas: 0 },
  {  id: 6, period: "Sáb", Quedas: 0 },
  {  id: 7, period: "Dom", Quedas: 1 },
];

const COLORSISACTIVE= ["#00C49F", "#FF8042"];

const Dashboard = () => {

 const renderLabel = ({ percent, name }) =>
    `${name}: ${(percent * 100).toFixed(0)}%`;

  return (
    <div className={styles.dashboard}>
      {/* HEADER-nome, bateria */}
      <header className={styles.header}>
        <div>
          <h2>João Silva Alberto</h2>
          <p>Status: Em repouso</p>
        </div>

        <div className={styles.batteryStatus}>
          <p><FaBatteryThreeQuarters color="#22c55e"/> 85%</p>
          <small>Última atualização: 16/10/2025 14:30</small>
        </div>

        <button className={styles.emergencyButton}>
          Emergência
        </button>
      </header>

      {/* LEFT COLUMN-parametros vitais, */}
      <aside className={styles.leftColumn}>
        <h3>Parâmetros Vitais</h3>
        <div className={styles.vitalParams}>
          <div className={styles.card}>
            <span className={styles.vitalTitle}><FaHeart color="#e11d48" /> Pressão Arterial:</span>
            <p className={styles.vitalData}><b>120/80 mmHg</b></p>
          </div>
          <div className={styles.card}>
            <span className={styles.vitalTitle}><SiOxygen color="#38bdf8" /> Oxigênio no Sangue:</span>
            <p className={styles.vitalData}><b>98%</b></p>
          </div>
          <div className={styles.card}>
            <span className={styles.vitalTitle}><FaWalking color="#22c55e" /> Passos Diários:</span>
            <p className={styles.vitalData}><b>4.500</b></p>
          </div>
        </div>
      </aside>

      {/* CENTER CONTENT- Quedas, frequencia, atividade*/}
      <main className={styles.center}>
        <div className={styles.card}>
          <h3><GiNetworkBars color="#0ea5e9"/> Quedas por Período</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={fallsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Quedas" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.card}>
          <h3><FaHeartbeat color="#e11d48" /> Frequência Cardíaca</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={heartRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bpm" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.card}>
          <h3> <FaStopwatch color="#0b8cf5ff" /> Tempo Ativo vs. Inativo</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                outerRadius={67}
                dataKey="percent"
                label={renderLabel}
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${entry.id}`} fill={COLORSISACTIVE[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>

      {/* RIGHT COLUMN - Localização, mapa e eventos*/}
      <aside className={styles.rightColumn}>
        <h3><FaMapMarkerAlt color="#f59e0b"/> Localização</h3>
        <div className={styles.mapPlaceholder}>
          <p>Mapa em desenvolvimento</p>
        </div>

        <h3><FaFileAlt color="#6b7280"/> Eventos Recentes</h3>
        <ul>{/* notificações a receber*/}
          <li className={styles.alert}>15/10/2025 10:15 — Queda Detectada</li>
          <li className={styles.alert}>14/10/2025 18:45 — Queda Detectada</li>
          <li className={styles.alert}>16/10/2025 14:00 — Queda Detectada</li>
          <li>16/10/2025 12:30 — Bateria Baixa</li>
          <li>15/10/2025 10:15 — Movimento Detectado</li>
        </ul>
      </aside>
    </div>
  );
};

export default Dashboard;
