const nodemailer = require('nodemailer');
const multer = require('multer');

// Configuração do Multer
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {

  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(file.originalname.toLowerCase().split('.').pop());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Apenas PDF, PNG ou JPG são permitidos!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter,
}).single('attachment');

class SupportController {

  static async sendSupportEmail(req, res) {
    
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { name, phone, email, category, description } = req.body;
      const attachment = req.file;

      if (!name || !phone || !email || !category || !description) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: { rejectUnauthorized: false },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'suporte@vivawatch.com',
        subject: `Nova Mensagem de Suporte: ${category}`,
        html: `
          <h3>Detalhes do Suporte</h3>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Celular:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Categoria:</strong> ${category}</p>
          <p><strong>Descrição:</strong> ${description}</p>
        `,
        attachments: attachment ? [{
          filename: attachment.originalname,
          content: attachment.buffer,
        }] : [],
      };

      try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
      } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ message: 'Erro ao enviar mensagem. Tente novamente.' });
      }
    });
  }
}

module.exports = SupportController;