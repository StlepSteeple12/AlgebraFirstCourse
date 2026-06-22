export default async function handler(req, res) {
  
  if (req.method !== 'POST') {
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  }
  

  
  const { email } = req.body;
  

  
  if (!email) {
    
    return res.status(400).json({ error: 'Email is required' });
    
  }
  

  
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  const PROTOTYPE_URL = 'https://rsiouwyhpybmeffgexhg.supabase.co/storage/v1/object/public/public-bucket/AlgebraFirstCourse%20Ch1-2.pdf';
  

  
  try {
    
    const response = await fetch('https://api.resend.com/emails', {
      
      method: 'POST',
      
      headers: {
        
        'Content-Type': 'application/json',
        
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        
      },
      
      body: JSON.stringify({
        
        from: 'Algebra First Course <onboarding@resend.dev>',
        
        to: email,
        
        subject: 'Your Free Algebra Prototype (Chapters 1-2)',
        
        html: `
        
          <h1>Welcome to Algebra: A First Course</h1>
          
          <p>Thank you for your interest! You can download your free preview of Chapters 1-2 using the link below:</p>
          
          <p><a href="${PROTOTYPE_URL}">Download Chapters 1-2 (PDF)</a></p>
          
          <p>If you have any questions, feel free to reply to this email.</p>
          
          <p>Best regards,<br>The MathLab Team</p>
          
        `,
        
      }),
      
    });
    

    
    if (response.ok) {
      
      return res.status(200).json({ message: 'Email sent successfully' });
      
    } else {
      
      const errorData = await response.json();
      
      return res.status(response.status).json({ error: errorData.message || 'Failed to send email' });
      
    }
    
  } catch (error) {
    
    return res.status(500).json({ error: 'Internal server error' });
    
  }
  
}













































