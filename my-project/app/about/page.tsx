  export default function About() {
    return (
      <div className="bg-gray-50 py-16 px-6 sm:px-16 lg:px-24">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 flex justify-center items-center bg-gray-200 opacity-50"></div>
            <div className="relative z-10 text-center lg:text-left">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Menciptakan Koneksi Karir yang Lebih Mudah dan Efektif</h2>
              <p className="text-lg text-gray-600 mb-6">
                Selamat datang di Recruiteasy, platform rekrutmen yang mempermudah perusahaan menemukan talenta terbaik di bidang teknologi dan IT.
                Kami menggabungkan teknologi terbaru dengan pendekatan berbasis data untuk menciptakan pengalaman rekrutmen yang efisien dan menyenangkan.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Di Recruiteasy, kami menyediakan solusi rekrutmen yang dapat disesuaikan dengan kebutuhan perusahaan, mulai dari pencarian kandidat hingga proses wawancara.
                Fitur canggih seperti pelacakan aplikasi dan tes keterampilan memastikan perusahaan mendapatkan talenta yang tepat dengan cepat dan akurat.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Layanan Kami</h3>
            <ul className="list-none pl-6 space-y-4 text-gray-700">
              <li className="flex items-center">
                <i className="fas fa-cogs text-green-500 mr-4"></i>
                <span>Technology Consultancy</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-handshake text-green-500 mr-4"></i>
                <span>We Provide Best Services</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-tools text-green-500 mr-4"></i>
                <span>Maintenance And Support</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-4"></i>
                <span>Requirements Gathering</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
