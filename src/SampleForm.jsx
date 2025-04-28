// SampleForm.jsx

import { useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const themes = [
  {
    id: "nutrition",
    title: "Nutrition",
    questions: [
      {
        question: "Quel type de petit-déjeuner préférez-vous ?",
        options: [
          { text: "Fruits frais", value: 3 },
          { text: "Viennoiseries", value: 1 },
          { text: "Céréales complètes", value: 2 },
        ],
      },
      {
        question: "À quelle fréquence mangez-vous des légumes ?",
        options: [
          { text: "Tous les jours", value: 3 },
          { text: "Quelques fois par semaine", value: 2 },
          { text: "Rarement", value: 1 },
        ],
      },
    ],
  },
  {
    id: "habitudes",
    title: "Habitudes alimentaires",
    questions: [
      {
        question: "Comment évaluez-vous votre consommation de sucre ?",
        options: [
          { text: "Très faible", value: 3 },
          { text: "Modérée", value: 2 },
          { text: "Élevée", value: 1 },
        ],
      },
      {
        question: "Consommez-vous souvent des plats préparés ?",
        options: [
          { text: "Très rarement", value: 3 },
          { text: "Parfois", value: 2 },
          { text: "Souvent", value: 1 },
        ],
      },
    ],
  },
  {
    id: "hydratation",
    title: "Hydratation",
    questions: [
      {
        question: "Combien de verres d'eau buvez-vous par jour ?",
        options: [
          { text: "8 verres ou plus", value: 3 },
          { text: "5 à 7 verres", value: 2 },
          { text: "Moins de 5 verres", value: 1 },
        ],
      },
      {
        question: "Quelle est votre consommation de boissons sucrées ?",
        options: [
          { text: "Très faible", value: 3 },
          { text: "Modérée", value: 2 },
          { text: "Élevée", value: 1 },
        ],
      },
    ],
  },
];

export default function SampleForm() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleChange = (themeId, questionIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [`${themeId}-${questionIndex}`]: value,
    }));
  };

  const calculateResults = () => {
    const results = themes.map((theme) => {
      const total = theme.questions.reduce((acc, _, index) => {
        const key = `${theme.id}-${index}`;
        return acc + (parseInt(answers[key]) || 0);
      }, 0);
      return { theme: theme.title, score: total };
    });
    return results;
  };

  const data = calculateResults();

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      {!showResults ? (
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          {themes.map((theme) => (
            <Card key={theme.id}>
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4">{theme.title}</h2>
                {theme.questions.map((q, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="font-semibold mb-2">{q.question}</p>
                    {q.options.map((option, optIdx) => (
                      <div key={optIdx} className="flex items-center mb-1">
                        <input
                          type="radio"
                          name={`${theme.id}-${idx}`}
                          value={option.value}
                          onChange={(e) =>
                            handleChange(theme.id, idx, e.target.value)
                          }
                          className="mr-2"
                        />
                        <label>{option.text}</label>
                      </div>
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
          <Button onClick={() => setShowResults(true)}>Voir les résultats</Button>
        </div>
      ) : (
        <div className="w-full max-w-xl">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            width={500}
            height={400}
            data={data}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="theme" />
            <PolarRadiusAxis angle={30} domain={[0, 6]} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
          <Button className="mt-6" onClick={() => setShowResults(false)}>
            Refaire le questionnaire
          </Button>
        </div>
      )}
    </div>
  );
}
