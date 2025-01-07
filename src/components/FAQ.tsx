import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ImageSlider } from './image-slider'

const faqs = [
  {
    question: "How does the giveaway Event work?",
    answer:
      "Participants can purchase tickets through our secure platform. Each ticket represents one entry into the giveaway event. The more tickets you purchase, the higher your chances of winning.",
  },
  {
    question: "When will the winner be announced?",
    answer:
      "The winner will be announced live on our social media channels when the countdown timer reaches zero. All participants will also be notified via email.",
  },
  {
    question: "Is the giveaway Event available internationally?",
    answer:
      "Currently, the giveaway Event is only open to residents of the United States and Canada (excluding Quebec).",
  },
  {
    question: "What happens if I win?",
    answer:
      "If you win, we'll contact you via email and phone. We'll handle all paperwork, taxes, and delivery arrangements to ensure a smooth process.",
  },
  {
    question: "Are the taxes included?",
    answer:
      "Yes! We cover all applicable taxes and fees associated with the prize. The winner receives the Tesla Model Y completely free and clear.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="h-[450px] hidden md:block">
          <ImageSlider />
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-white font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#FFD700]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#FFD700]" />
                )}
              </button>
              <div
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openIndex === index ? "py-4" : "py-0 h-0"
                }`}
              >
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

