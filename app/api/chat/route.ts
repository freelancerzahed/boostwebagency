import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    let responseMessage = ""

    // Simple rule-based responses
    const lowerCaseMessage = message.toLowerCase()

    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      responseMessage = "Hello there! How can I assist you today with Boost Web Agency's services?"
    } else if (lowerCaseMessage.includes("services") || lowerCaseMessage.includes("offer")) {
      responseMessage =
        "Boost Web Agency offers a wide range of services including Web Development & Design, Digital Marketing & SEO, E-commerce Solutions, and Logo Design. What are you most interested in?"
    } else if (lowerCaseMessage.includes("pricing") || lowerCaseMessage.includes("cost")) {
      responseMessage =
        "Our pricing varies depending on the scope and complexity of your project. We offer custom packages tailored to your needs. Would you like a free consultation to discuss your specific requirements and get a personalized quote?"
    } else if (lowerCaseMessage.includes("contact")) {
      responseMessage =
        "You can reach us by phone at +880 1603-108425 or +880 1869-731202, or email us at boostwebagency.info@gmail.com. We are located in Dhaka, Bangladesh."
    } else if (lowerCaseMessage.includes("web development") || lowerCaseMessage.includes("website")) {
      responseMessage =
        "We specialize in creating modern, responsive, and high-performing websites tailored to your business goals. We use the latest technologies to ensure your online presence stands out."
    } else if (lowerCaseMessage.includes("digital marketing") || lowerCaseMessage.includes("seo")) {
      responseMessage =
        "Our digital marketing services include SEO, social media marketing, content marketing, and paid advertising to help you reach your target audience and grow your online presence."
    } else if (lowerCaseMessage.includes("e-commerce") || lowerCaseMessage.includes("online store")) {
      responseMessage =
        "We build robust and user-friendly e-commerce solutions that drive sales and provide a seamless shopping experience for your customers."
    } else if (lowerCaseMessage.includes("thank you") || lowerCaseMessage.includes("thanks")) {
      responseMessage = "You're most welcome! Is there anything else I can help you with?"
    } else if (lowerCaseMessage.includes("bye") || lowerCaseMessage.includes("goodbye")) {
      responseMessage = "Goodbye! Feel free to reach out anytime if you have more questions. Have a great day!"
    } else {
      responseMessage =
        "I'm sorry, I can only answer questions related to Boost Web Agency's services, pricing, and contact information. Can you please rephrase your question?"
    }

    return NextResponse.json({ success: true, message: responseMessage })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
