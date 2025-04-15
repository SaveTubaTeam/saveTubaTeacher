import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import './CreateAssignmentCSS.css';
import '../../App.css';
import NavigationBar from '../../global-components/NavbarComponents/NavigationBar';
import ClassSelect from './ClassSelect';
import ChapterSelect from '../../global-components/DashboardComponents/DataTableComponents/ChapterSelect';
import LessonSelect from '../../global-components/DashboardComponents/DataTableComponents/LessonSelect';
import Footer from '../../global-components/Footer';
import AssignmentPreview from './AssignmentPreview';
import { useTranslation } from 'react-i18next'; //needed for translations


const CreateAssignment = () => {
  const { t } = useTranslation(); //needed for translations
  const [grade, setGrade] = useState('');
  const [chapter, setChapter] = useState('');
  const [lesson, setLesson] = useState('');
  const [dateDue, setDateDue] = useState('');
  const [numActivities, setNumActivities] = useState(0);
  const [email, setEmail] = useState('savetuba2023@gmail.com'); //has 0 classrooms
  // const [email, setEmail] = useState('testteacher1@gmail.com'); //has multiple classrooms
  const [classCode, setClassCode] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();
  const [isCreated, setIsCreated] = useState(false); // Track successful creation


  const handleClassChange = async (selectedClass) => {
    setGrade(selectedClass.grade);
    console.log('Selected Class:', selectedClass);

    try {
      const userDoc = await db.collection('teachers').doc(email).get();
      const userData = userDoc.data();
      const classes = userData.classes;

      const matchedClass = classes.find(cls => cls.className === selectedClass.className && cls.gradeLevel === selectedClass.grade);
      if (matchedClass) {
        setClassCode(matchedClass.classCode);
        console.log('Class Code:', matchedClass.classCode);
      } else {
        console.error('Class not found!');
        setClassCode('');
      }
    } catch (error) {
      console.error('Error fetching classCode:', error);
      setClassCode('');
    }
  };

  useEffect(() => {
    console.log('Updated Grade:', grade);
  }, [grade]);

  const handleChapterChange = (selectedChapter) => {
    setChapter(selectedChapter);
  };

  const handleLessonChange = async (selectedLesson) => {
    setLesson(selectedLesson);

    try {
      const enDoc = await db.collection(grade)
                            .doc(chapter)
                            .collection(selectedLesson)
                            .doc('en')
                            .get();

      if (enDoc.exists) {
        const data = enDoc.data();
        const numActivities = data.numActivities || 0;
        setNumActivities(numActivities);
      } else {
        console.error('Document does not exist!');
        setNumActivities(0);
      }
    } catch (error) {
      console.error('Error fetching numActivities:', error);
      setNumActivities(0);
    }
  };

  const handleDateDueChange = (e) => {
    setDateDue(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const lastGradeChar = grade.charAt(grade.length - 1);
    const lastChapterChar = chapter.charAt(chapter.length - 1);
    const trailingNumbers = lesson.match(/\d+$/);

    if (trailingNumbers) {
      const lastLessonNumbers = trailingNumbers[0];
      console.log("Trailing numbers:", lastLessonNumbers);
    } else {
      console.log("No trailing numbers found");
    }
    const assignmentID = `G${lastGradeChar}C${lastChapterChar}L${trailingNumbers}`;

    const dateAssigned = formatDateTime(new Date());
    const dateDueFormatted = formatDateTime(new Date(dateDue));

    const assignmentData = {
      assignmentID: assignmentID,
      dateAssigned: dateAssigned,
      dateDue: dateDueFormatted,
      numActivities: numActivities,
    };
    const asCode = `Assignments_${classCode}`
    try {
      await db.collection('teachers')
        .doc(email)
        .collection(asCode)
        .doc(assignmentID)
        .set(assignmentData);

      console.log('Assignment created successfully!');
      setIsCreated(true); // Set to true after successful creation
      
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  const formatDateTime = (date) => {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  const isFormValid = grade && chapter && lesson && dateDue;

  return (
    <div className='mainContainer'>
      <NavigationBar contentType="dashboard" />
      
      <h1>{`${t("common:createAssignment")}`}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <ClassSelect onChange={handleClassChange} />
        </div>
        <div>
          <ChapterSelect
            grade={grade}
            onChange={handleChapterChange}
          />
        </div>
        <div>
          <LessonSelect
            grade={grade}
            chapter={chapter}
            onChange={handleLessonChange}
          />
        </div>
        <div>
          <label htmlFor="dateDue">{`${t("common:dueDate")}`}</label>
          <input
            type="datetime-local"
            id="dateDue"
            value={dateDue}
            onChange={handleDateDueChange}
          />
        </div>
        <button type="button" onClick={() => setShowPreview(true)}>{`${t("common:preview")}`}</button>
        <button type="submit" className='sas' disabled={!isFormValid}>{`${t("common:create")}`}</button> {/* Create button to create the new assignment */}
        {isCreated && (
          <div>
            Assignment created successfully!
          </div>
        )}
      </form>

      {showPreview && (
        <AssignmentPreview
          grade={grade}
          chapter={chapter}
          lesson={lesson}
          onClose={() => setShowPreview(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default CreateAssignment;
