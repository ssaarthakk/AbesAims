import { ToastAndroid } from 'react-native';
import { Questions } from '../types/quizQuestions';
import { fetchGroqResponse } from './aiResponses';
import { submitAnswer } from './apicalls';
import removePreTags from './sanitizeString';

/**
 * Processes quiz questions using AI and submits answers to the API
 * @param questions Array of quiz questions
 * @param quizCode Unique code for the quiz
 * @returns Promise that resolves to a status string: 'success' or 'failure'
 */
export const processQuizWithAI = async (questions: Questions[], quizCode: string): Promise<string> => {
  try {
    console.log(`Starting to process ${questions.length} questions with AI...`);
    
    if (!questions || questions.length === 0) {
      console.log('No questions to process');
      return 'failure_no_questions';
    }
    
    // Process each question sequentially
    for (const question of questions) {
      // Skip if answer already submitted
      if (question.submitted_answer !== null) {
        console.log(`Question ${question.id} already answered, skipping...`);
        continue;
      }
      
      // Create prompt for AI with question and options
      const optionsText = question.options
        .map((option, index) => `${String.fromCharCode(65 + index)}. ${removePreTags(option)}`)
        .join('\n');
      
      const prompt = `${removePreTags(question.question)}\n\n${optionsText}`;
      
      // Get AI response
      console.log(`Getting AI response for question ${question.id}...`);
      const aiResponse = await fetchGroqResponse(prompt);
      console.log(`AI response: ${aiResponse}`);
      
      // Find matching option index
      let answerIndex = -1;
      for (let i = 0; i < question.options.length; i++) {
        if (removePreTags(question.options[i].trim()) === aiResponse.trim()) {
          answerIndex = i;
          break;
        }
      }
      
      // If no exact match, try to find closest option (fuzzy match)
      if (answerIndex === -1) {
        console.log('No exact match found, trying fuzzy match...');
        
        let bestMatchIndex = 0;
        let bestMatchScore = 0;
        
        for (let i = 0; i < question.options.length; i++) {
          const option = removePreTags(question.options[i].toLowerCase());
          const response = aiResponse.toLowerCase();
          
          if (option.includes(response) || response.includes(option)) {
            const score = Math.max(
              option.length / response.length,
              response.length / option.length
            );
            
            if (score > bestMatchScore) {
              bestMatchScore = score;
              bestMatchIndex = i;
            }
          }
        }
        
        if (bestMatchScore > 0.5) {
          answerIndex = bestMatchIndex;
          console.log(`Fuzzy match found. Option index: ${answerIndex}`);
        } else {
          // Default to first option if no match found
          answerIndex = 0;
          console.log('No match found, defaulting to first option');
        }
      }
      
      // Submit answer to API
      console.log(`Submitting answer index ${answerIndex} for question ${question.id}`);
      const result = await submitAnswer(
        quizCode,
        question.id.toString(),
        answerIndex
      );
      
      console.log(`API response: ${JSON.stringify(result)}`);
      
      // If there's an error message in the API response, return failure
      if (result && typeof result === 'object' && result.message && 
          (result.message.includes('error') || result.message.includes('fail'))) {
        return 'failure_api';
      }
    }
    
    // Show completion message
    console.log('All questions processed successfully!');
    ToastAndroid.show('All answers have been submitted!', ToastAndroid.LONG);
    
    return 'success';
  } catch (error) {
    console.error('Error processing quiz with AI:', error);
    ToastAndroid.show('Error processing quiz answers', ToastAndroid.LONG);
    return 'failure_exception';
  }
};

/**
 * Processes a single question using AI and returns the answer index
 * @param question Quiz question object
 * @returns Promise that resolves to the answer index
 */
export const getAnswerForQuestion = async (question: Questions): Promise<number> => {
  try {
    // Create prompt for AI with question and options
    const optionsText = question.options
        .map((option, index) => `${String.fromCharCode(65 + index)}. ${removePreTags(option)}`)
        .join('\n');
    
    const prompt = `${removePreTags(question.question)}\n\n${optionsText}`;
    
    // Get AI response
    const aiResponse = await fetchGroqResponse(prompt);
    
    // Find matching option index
    let answerIndex = -1;
    for (let i = 0; i < question.options.length; i++) {
      if (removePreTags(question.options[i].trim()) === aiResponse.trim()) {
        answerIndex = i;
        break;
      }
    }
    
    // If no exact match, try to find closest option
    if (answerIndex === -1) {
      let bestMatchIndex = 0;
      let bestMatchScore = 0;
      
      for (let i = 0; i < question.options.length; i++) {
        const option = question.options[i].toLowerCase();
        const response = aiResponse.toLowerCase();
        
        if (option.includes(response) || response.includes(option)) {
          const score = Math.max(
            option.length / response.length,
            response.length / option.length
          );
          
          if (score > bestMatchScore) {
            bestMatchScore = score;
            bestMatchIndex = i;
          }
        }
      }
      
      if (bestMatchScore > 0.5) {
        answerIndex = bestMatchIndex;
      } else {
        // Default to first option if no match found
        answerIndex = 0;
      }
    }
    
    return answerIndex;
  } catch (error) {
    console.error('Error getting answer for question:', error);
    // Default to first option in case of error
    return 0;
  }
};
