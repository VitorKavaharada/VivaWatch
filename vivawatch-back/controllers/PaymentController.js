const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class PaymentController {

  static async createPaymentIntent(req, res) {
    
    const { amount, currency, plan, cpf } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: currency || 'brl',
        metadata: { plan, cpf },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Erro ao criar Payment Intent:', error);
      res.status(500).json({ error: 'Erro ao processar pagamento' });
    }
  }
}

module.exports = PaymentController;