import { useState } from "react";

function App() {
  const [queue, setQueue] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [name, setName] = useState("");
  const [loket, setLoket] = useState([null, null, null, null, null]); // 5 loket
  const [currentLoket, setCurrentLoket] = useState(0); // urutan loket aktif

  const addToQueue = () => {
    if (!name.trim()) {
      alert("Masukkan nama terlebih dahulu!");
      return;
    }

    // Tambahkan objek dengan nomor dan nama
    setQueue([...queue, { number: currentNumber, name }]);
    setCurrentNumber(currentNumber + 1);
    setName("");
  };

  const serveNext = () => {
    if (queue.length === 0) return;

    const nextCustomer = queue[0];
    const updatedLoket = [...loket];

    // masukkan ke loket aktif
    updatedLoket[currentLoket] = nextCustomer.number;
    setLoket(updatedLoket);

    // lanjut ke loket berikutnya (1→2→3→4→5→1)
    setCurrentLoket((currentLoket + 1) % 5);

    // hapus dari antrian
    setQueue(queue.slice(1));
  };

  const printTicket = () => {
    if (queue.length === 0) {
      alert("Belum ada antrian untuk dicetak!");
      return;
    }

    const current = queue[queue.length - 1]; // ambil antrian terakhir (baru diambil)
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Tiket Antrian</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 50px;
            }
            h1 {
              font-size: 60px;
              margin-bottom: 20px;
            }
            h2 {
              font-size: 40px;
              margin-bottom: 10px;
            }
            p {
              font-size: 30px;
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <h1>Nomor Antrian</h1>
          <h2>${current.number}</h2>
          <p>Nama: <strong>${current.name}</strong></p>
          <p>Terima kasih telah menunggu 🙏</p>
          <script>
            window.print();
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-zinc-400 mb-10">Sistem Antrian</h1>

      {/* Kotak antrian utama */}
      <div className="flex flex-row items-start justify-center gap-20 mb-8">
        {/* Antrian selanjutnya */}
        <div className="bg-zinc-800 rounded-lg w-[500px] h-[500px] flex flex-col items-center justify-center shadow-2xl border border-zinc-600">
          <h2 className="text-[40px] text-white font-semibold mb-4">
            Antrian Selanjutnya
          </h2>
          <div className="text-[200px] font-bold text-white leading-none">
            {queue.length > 1 ? queue[1].number : "-"}
          </div>
        </div>

        {/* Antrian saat ini */}
        <div className="bg-zinc-800 rounded-lg w-[500px] h-[500px] flex flex-col items-center justify-center shadow-2xl border border-zinc-600">
          <h2 className="text-[40px] text-white font-semibold mb-4">
            Antrian Saat Ini
          </h2>
          <div className="text-[200px] font-bold text-white leading-none">
            {queue.length > 0 ? queue[0].number : "-"}
          </div>
        </div>
      </div>

      {/* Loket */}
      <div className="grid grid-cols-5 gap-6 mt-5 mb-12">
        {loket.map((nomor, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-lg w-[200px] h-[200px] flex flex-col items-center justify-center shadow-lg border border-zinc-600"
          >
            <h3 className="text-white text-2xl font-semibold mb-2">
              Loket {index + 1}
            </h3>
            <div className="text-[80px] font-bold text-white leading-none">
              {nomor ? nomor : "-"}
            </div>
          </div>
        ))}
      </div>

      {/* Input nama */}
      <div className="flex flex-col items-center gap-4 mb-6 mt-4 text-white">
        <input
          type="text"
          placeholder="Masukkan nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-400 rounded-lg p-2 w-80 text-center text-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      {/* Tombol */}
      <div className="flex flex-row items-center justify-center gap-6">
        <button
          onClick={addToQueue}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          Ambil Nomor
        </button>
        <button
          onClick={serveNext}
          className={`${
            queue.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          } text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300`}
          disabled={queue.length === 0}
        >
          Layani Selanjutnya
        </button>
        <button
          onClick={printTicket}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          Print Nomor
        </button>
      </div>
    </div>
  );
}

export default App;
