import CircleBox from "@/components/CircleBox";
import Header from "@/components/Header";
import { Question, questions } from "@/data/data";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("")
  const [selectedBox, setSelectedBox] = useState<{ [id: number]: number }>(
    questions.reduce((prev, curr) => ({ ...prev, [curr.id]: 0 }), {})
  );
  

  const [typeScores, setTypeScores] = useState<{ [type: string]: number }>({
    energy: 0,
    information: 0,
    decision: 0,
    lifeStyle: 0,
  });


  const handleBoxClick = (questionId: number, value: number) => {
    const prevValue = selectedBox[questionId];  // 前回の値を取得
  
    setSelectedBox(prev => ({ ...prev, [questionId]: value }));
  
    const questionType = questions.find((q) => q.id === questionId)?.type;
    if (questionType) {
      setTypeScores((prev) => ({
        ...prev,
        [questionType]: (prev[questionType] || 0) - prevValue + value,  // 前回の値を引き、新たな値を加える
      }));
    }
  }  

  const calculatePersonality = (typeScores: { [type: string]: number }) => {
    const personality = [
      typeScores.energy > 3 ? 'E' : 'I',
      typeScores.information > 3 ? 'S' : 'N',
      typeScores.decision > 3 ? 'T' : 'F',
      typeScores.lifeStyle > 3 ? 'J' : 'P',
    ].join('');

    return personality;
  };

  const handleSubmit = () => {
    const personality = calculatePersonality(typeScores)
    setMessage("あなたの性格タイプは " + personality + " です！")
  }

  return (
    <Box sx={{py:8, display:"flex", flexDirection:"column", alignItems:"center"}}>
      <Header />
      
      {questions.map((question:Question) => (
        <Box sx={{mt:10,  mx:"auto", width: '100%', maxWidth:"800px",}}>
          <Typography sx={{fontWeight:"bold"}}>Q, {question.text}</Typography>
          <Box
            sx={{
              mt:2,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',

            }}
          >
              <CircleBox onClick={() => handleBoxClick(question.id, 5)} selected={selectedBox[question.id] === 5}/>
              <CircleBox onClick={() => handleBoxClick(question.id, 4)} selected={selectedBox[question.id] === 4}/>
              <CircleBox onClick={() => handleBoxClick(question.id, 3)} selected={selectedBox[question.id] === 3}/>
              <CircleBox onClick={() => handleBoxClick(question.id, 2)} selected={selectedBox[question.id] === 2}/>
              <CircleBox onClick={() => handleBoxClick(question.id, 1)} selected={selectedBox[question.id] === 1}/>

          </Box>
          <Box sx={{display:"flex", justifyContent:"space-between", mx:6, mt:2}}>
            <Typography sx={{color:"rgb(89, 118, 138)", fontWeight:"bold"}}>同意する</Typography>
            <Typography sx={{color:"rgb(255, 107, 107)", fontWeight:"bold"}}>同意しない</Typography>
          </Box>
        </Box>
      ))}
        
      <Button variant="contained" sx={{mt:4, width:"100px"}} onClick={handleSubmit}>診断する</Button>
      <Typography sx={{mt:4, fontSize:"2rem"}}>{message}</Typography>
    </Box>
  )
}
