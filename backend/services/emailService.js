const brevo = require('@getbrevo/brevo');

const sendBudgetAlert = async (totalExpenses, budgetLimit) => {
  try {
    // Configure Brevo API
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // Prepare email
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = 'Budget Alert: Expenses Exceeded!';
    sendSmtpEmail.to = [{ email: process.env.ALERT_EMAIL }];
    sendSmtpEmail.sender = { 
      name: 'Expense Tracker', 
      email: process.env.ALERT_EMAIL 
    };
    
    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <h2>Budget Alert!</h2>
          <p>Your total expenses have exceeded the budget limit.</p>
          <p><strong>Total Expenses:</strong> $${totalExpenses.toFixed(2)}</p>
          <p><strong>Budget Limit:</strong> $${budgetLimit}</p>
          <p><strong>Over Budget By:</strong> $${(totalExpenses - budgetLimit).toFixed(2)}</p>
          <p>Please review your expenses and take necessary action.</p>
        </body>
      </html>
    `;

    // Send email
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Budget alert email sent successfully:', result.messageId);
    return result;
    
  } catch (error) {
    console.error('Failed to send budget alert email:', error);
    throw error;
  }
};

module.exports = { sendBudgetAlert };