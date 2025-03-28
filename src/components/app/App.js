import React, {useState} from "react";
import './App.css';
import {Button, TextField} from "@mui/material";
import {ButtonComponent} from "../../ui/ButtonComponent";

const name = localStorage.getItem("name");
const id = localStorage.getItem("id");
const currentStep = localStorage.getItem("step");
const group_id_array = JSON.parse(localStorage.getItem("group_id"));
const group_name_array = JSON.parse(localStorage.getItem("group_names"));
const group_index = JSON.parse(localStorage.getItem("group_index"));
const scenario_name_array = JSON.parse(localStorage.getItem("scenario_name_array"));
const scenario_id_array = JSON.parse(localStorage.getItem("scenario_id_array"));
const scenario_index = JSON.parse(localStorage.getItem("scenario_index"));
const start_task = JSON.parse(localStorage.getItem("start_task"));
const end_task = JSON.parse(localStorage.getItem("end_task"));
const task_id_array = JSON.parse(localStorage.getItem("task_id_array"));
const task_array = JSON.parse(localStorage.getItem("task_array"));
const choices_array = JSON.parse(localStorage.getItem("choices_array"));
const question_id = JSON.stringify(localStorage.getItem("question_id"));
const multi_choice_array = JSON.parse(localStorage.getItem("multi_choice_array"));
const employee_array = JSON.parse(localStorage.getItem("employee_array"));
const active_scenario = JSON.parse(localStorage.getItem("active_scenario"));

export function App() {
  const [step, setStep] = useState(currentStep ? Number(currentStep) : 1);
  const [orgName, setOrgName] = useState(name ? name : "");
  const [orgId, setOrgId] = useState(id ? Number(id) : 0);
  const [timeZone, setTimeZone] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [groupIdArray, setGroupIdArray] = useState(group_id_array ? [...group_id_array] : []);
  const [groupNamesArray, setGroupNamesArray] = useState(group_name_array ? [...group_name_array] : []);
  const [groupIndex, setGroupIndex] = useState(group_index ? Number(group_index) : 0);
  const [employee, setEmployee] = useState("");
  const [employeeArray, setEmployeeArray] = useState(employee_array ? employee_array : []);
  const [employeeNumber, setEmployeeNumber] = useState(0);
  const [forwarding, setForwarding] = useState(true);
  const [scenarioName, setScenarioName] = useState("");
  const [scenarioNameArray, setScenarioNameArray] = useState(scenario_name_array ? scenario_name_array : []);
  const [scenarioIdArray, setScenarioIdArray] = useState(scenario_id_array ? scenario_id_array : []);
  const [scenarioIndex, setScenarioIndex] = useState(scenario_index ? Number(scenario_index) : 0);
  const [startTask, setStartTask] = useState(start_task ? start_task : "");
  const [endTask, setEndTask] = useState(end_task ? end_task : "");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskIdArray, setTaskIdArray] = useState(task_id_array ? task_id_array : []);
  const [, setTaskObj] = useState({});
  const [taskArray, setTaskArray] = useState(task_array ? task_array : []);
  const [taskIndex, setTaskIndex] = useState(0);
  const [choiceItem, setChoiceItem] = useState("");
  const [choicesArray, setChoicesArray] = useState(choices_array ? choices_array : []);
  const [, setQuestionId] = useState(question_id ? Number(question_id) : 0);
  const [multiChoiceItem, setMultiChoiceItem] = useState("");
  const [multiChoiceArray, setMultiChoiceArray] = useState(multi_choice_array ? multi_choice_array : []);
  const [groupTargetValue, setGroupTargetValue] = useState("");
  const [employeeTargetValue, setEmployeeTargetValue] = useState("");
  const [AIAnalysisValue, setAIAnalysisValue] = useState("");
  const [analysisValue, setAnalysisValue] = useState("");
  const [activeScenario, setActiveScenario] = useState(active_scenario ? active_scenario : "");

  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();

  if (month > 10) {
    month = "0" + month;
  }

  /*const backdoor = async () => {
    const REACT_APP_SECRET_KEY =process.env.REACT_APP_SECRET_KEY;

    await fetch(
      `https://bize.work/api/backdoor?id=61548447&secret=${REACT_APP_SECRET_KEY}`,
      {
        credentials: "include",
      }
    )
  };*/

  const createCompany = async (event) => {
    event.preventDefault();

    await fetch("https://bize.work/api/org/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: orgName
      })
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then(obj => {
        console.log(obj);
        setOrgName(obj.name);
        localStorage.setItem("name", obj.name);
        setOrgId(obj.org_id);
        localStorage.setItem("id", obj.org_id);
        setStep(4);
        localStorage.setItem("step", "4");
      })
      .catch(error => {
        console.error(error);
      });
  };

  /*const enterKey = async (event) => {
    event.preventDefault();

    const promise = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done");
      }, 1000);
    })
      .then(() => {
        setStep(5);
        localStorage.setItem("step", "5");
      });
  };*/

  const deleteCompany = async () => {
    fetch(`https://bize.work/api/org/${orgId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
      } else {
        throw Error(resp.statusText);
      }
    })
      .then(obj => {
        console.log(obj);
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        localStorage.removeItem("groupIndex");
        localStorage.removeItem("group_id");
        localStorage.removeItem("group_names");
        localStorage.removeItem("scenario_id_array");
        localStorage.removeItem("scenario_name_array");
        localStorage.removeItem("scenario_index");
        localStorage.removeItem("employee_array");
        localStorage.removeItem("start_task");
        localStorage.removeItem("end_task");
        localStorage.removeItem("choices_array");
        localStorage.removeItem("multi_choice_array");
        localStorage.removeItem("question_id");
        localStorage.removeItem("task_array");
        localStorage.removeItem("task_id_array");
        localStorage.removeItem("active_scenario");
        setStep(1);
        localStorage.setItem("step", "1");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const setUTC = async (event) => {
    event.preventDefault();

    fetch(`https://bize.work/api/org/${orgId}/timezone`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timezone: timeZone
      })
    }).then(resp => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
      } else {
        throw Error(resp.statusText);
      }
    })
      .then(obj => {
        console.log(obj);
        setStep(4);
        localStorage.setItem("step", "4");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const setScenario = async (event) => {
    event.preventDefault();

    await fetch(`https://bize.work/api/org/${orgId}/scenario/create`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: scenarioName}),
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then(obj => {
        console.log(obj);
        localStorage.setItem("scenario_id_array", JSON.stringify([...scenarioIdArray, obj.scenario_id]));
        setScenarioIdArray([...scenarioIdArray, obj.scenario_id]);
        localStorage.setItem("scenario_name_array", JSON.stringify([...scenarioNameArray, obj.name]));
        setScenarioNameArray([...scenarioNameArray, obj.name]);
        console.log("scenario_name_array", scenarioNameArray);
        setStep(6);
        localStorage.setItem("step", "6");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const changeScenarioName = async (event) => {
    event.preventDefault();

    const scenarioId = scenarioIdArray[scenarioIndex];

    await fetch(`https://bize.work/api/org/${orgId}/scenario/${scenarioId}/name`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: scenarioName})
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then(obj => {
        console.log(obj);
        setScenarioNameArray(prevState => prevState.splice(scenarioIndex, 1, scenarioName));
        localStorage.setItem("scenario_name_array", JSON.stringify(scenarioNameArray));
        console.log("scenario_name_array", scenarioNameArray);
        setStep(6);
        localStorage.setItem("step", "6");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const selectScenario = async (index) => {
    setScenarioIndex(index);
    localStorage.setItem("scenario_index", JSON.stringify(index));
    setStep(7.1);
    localStorage.setItem("step", JSON.stringify(7.1));
  };

  const deleteScenario = async (event) => {
    event.preventDefault();

    const scenarioId = scenarioIdArray[scenarioIndex - 1];

    await fetch(`https://bize.work/api/org/${orgId}/scenario/${scenarioId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then(obj => {
        console.log(obj);
        setScenarioIdArray(prevState => {
          const newState = [...prevState];
          newState.splice(scenarioIndex - 1, 1);
          localStorage.setItem("scenario_id_array", JSON.stringify(newState));
          return newState;
        });
        setScenarioNameArray(prevState => {
          const newState = [...prevState];
          newState.splice(scenarioIndex - 1, 1);
          localStorage.setItem("scenario_name_array", JSON.stringify(newState));
          return newState;
        });
        setStep(6);
        localStorage.setItem("step", "6");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const enterStartTask = () => {
    localStorage.setItem("start_task", JSON.stringify(startTask));
    setStep(7.31);
    localStorage.setItem("step", "7.31");
  };

  const enterEndTask = () => {
    localStorage.setItem("end_task", JSON.stringify(endTask));
    setStep(7.32);
    localStorage.setItem("step", "7.32");
  };

  const enterDescription = async (event) => {
    event.preventDefault();

    const scenarioId = scenarioIdArray[scenarioIndex];

    await fetch(`https://bize.work/api/org/${orgId}/scenario/${scenarioId}/task/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: taskDescription,
        start_time_local: startTask,
        end_time_local: endTask,
      }),
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then(obj => {
        console.log(obj);
        setTaskIdArray(prevState => {
          const newArray = [...prevState, obj.task_id];
          setTaskIndex(newArray.length - 1);
          return newArray;
        });
        localStorage.setItem("task_id_array", JSON.stringify([...taskIdArray, obj.task_id]));
        setTaskObj({
          start: obj.start_time_local,
          end: obj.end_time_local,
          description: obj.description
        });
        setTaskArray(prevState => [...prevState, {
          start: obj.start_time_local,
          end: obj.end_time_local,
          description: obj.description
        }]);
        localStorage.setItem("task_array", JSON.stringify([...taskArray, {
          start: obj.start_time_local,
          end: obj.end_time_local,
          description: obj.description
        }]));
        setStep(7.33);
        localStorage.setItem("step", "7.33");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteTask = async (event) => {
    event.preventDefault();

    const scenarioId = scenarioIdArray[scenarioIndex];
    const taskId = taskIdArray[taskIndex - 1];

    await fetch(`https://bize.work/api/org/${orgId}/scenario/${scenarioId}/task/${taskId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then(obj => {
        console.log(obj);
        setTaskArray(prevState => {
          const newState = [...prevState];
          newState.splice(taskIndex - 1, 1);
          localStorage.setItem("task_array", JSON.stringify(newState));
          return newState
        });
        setTaskIdArray(prevState => {
          const newState = [...prevState];
          newState.splice(taskIndex - 1, 1);
          localStorage.setItem("task_id_array", JSON.stringify(newState));
          return newState
        });
        localStorage.removeItem("start_task");
        localStorage.removeItem("end_task");
        setStep(7.1);
        localStorage.setItem("step", "7.1");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const enterQuestionText = async () => {
    const scenarioId = scenarioIdArray[scenarioIndex];
    const taskId = taskIdArray[taskIndex];

    fetch(`https://bize.work/api/org/${orgId}/scenario/${scenarioId}/task/${taskId}/question/create/text`,
      {
        method: "GET",
        credentials: "include"
      })
      .then(() => {
        setStep(7.331)
        localStorage.setItem("step", "7.331");
      });
  };

  const enterSingleChoice = async (event) => {
    event.preventDefault();

    const scenarioId = scenarioIdArray[scenarioIndex];
    const taskId = taskIdArray[taskIndex];

    await fetch(`https://bize.work/api/org/${orgId}/scenario/${scenarioId}/task/${taskId}/question/create/single_choice`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({choices: choicesArray}),
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then(obj => {
        console.log(obj);
        localStorage.setItem("question_id", obj.question_id);
        setQuestionId(obj.question_id);
        setStep(7.1);
        localStorage.setItem("step", "7.1");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const setChoice = () => {
    setChoicesArray(prevState => {
      const newState = [...prevState, choiceItem];
      localStorage.setItem("choices_array", JSON.stringify(newState));
      return newState
    });
    console.log("choiceArray", choicesArray);
    setChoiceItem("");
  };

  const enterMultipleChoice = async (event) => {
    event.preventDefault();

    const scenarioId = scenarioIdArray[scenarioIndex];
    const taskId = taskIdArray[taskIndex];

    await fetch(`https://bize.work/api/org/${orgId}/scenario/${scenarioId}/task/${taskId}/question/create/multiple_choice`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ choices: multiChoiceArray }),
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then(obj => {
        console.log(obj);
        localStorage.setItem("question_id", obj.question_id);
        setQuestionId(obj.question_id);
        setStep(7.1);
        localStorage.setItem("step", "7.1");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const setMultiChoice = () => {
    setMultiChoiceArray(prevState => {
      const newState = [...prevState, multiChoiceItem];
      localStorage.setItem("multi_choice_array", JSON.stringify(newState));
      return newState
    });
    setMultiChoiceItem("");
  };

  const enterNewGroup = async (event) => {
    event.preventDefault();

    fetch(`https://bize.work/api/org/${orgId}/group/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newGroupName
      })
    }).then(resp => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
      } else {
        throw Error(resp.statusText);
      }
    })
      .then(obj => {
        console.log(obj);
        setGroupIdArray(prevState => [...prevState, obj.group_id]);
        localStorage.setItem("group_id", JSON.stringify([...groupIdArray, obj.group_id]));
        setGroupNamesArray(prevState => [...prevState, obj.name]);
        localStorage.setItem("group_names", JSON.stringify([...groupNamesArray, obj.name]));
        setStep(4.1);
        localStorage.setItem("step", "4.1");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteGroup = async (event) => {
    event.preventDefault();

    const groupId = groupIdArray[groupIndex - 1];

    fetch(`https://bize.work/api/org/${orgId}/group/${groupId}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(resp => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
      } else {
        throw Error(resp.statusText);
      }
    })
      .then(obj => {
        console.log(obj);
        setGroupIdArray(prevState => {
          const newState = [...prevState];
          newState.splice(groupIndex - 1, 1);
          localStorage.setItem("group_id", JSON.stringify(newState));
          return newState
        });

        setGroupNamesArray(prevState => {
          const newState = [...prevState];
          newState.splice(groupIndex - 1, 1);
          localStorage.setItem("group_names", JSON.stringify(newState));
          return newState
        });
        setStep(4.1);
        localStorage.setItem("step", "4.1");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const addEmployee = async (event) => {
    event.preventDefault();

    const groupId = groupIdArray[groupIndex];

    fetch(`https://bize.work/api/org/${orgId}/group/${groupId}/add_member`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "member_name": employee
      })
    }).then(resp => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
      } else {
        throw Error(resp.statusText);
      }
    })
      .then(obj => {
        console.log(obj);
        const user = {
          invitation_key: obj.invitation_key,
          member_id: obj.member_id,
          name: obj.name
        }
        setEmployeeArray(prevState => {
          const newState = [...prevState, user];
          localStorage.setItem("employee_array", JSON.stringify(newState));
          return newState
        });
        setStep(4.3);
        localStorage.setItem("step", "4.3");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteEmployee = async (event) => {
    event.preventDefault();

    const groupId = groupIdArray[groupIndex];
    const memberId = employeeArray[employeeNumber - 1].member_id;

    await fetch(`https://bize.work/api/org/${orgId}/group/${groupId}/member/${memberId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then((obj) => {
        console.log(obj);
        setEmployeeArray(employeeArray.filter(user => user.member_id !== obj.member_id));
        localStorage.setItem("employee_array", JSON.stringify(employeeArray));
        setStep(4.3);
        localStorage.setItem("step", "4.3");
      })
      .catch(error => {
        console.error(error);
      });
  };


  const setGroup = (index) => {
    setGroupIndex(index);
    localStorage.setItem("groupIndex", index);
    setStep(4.3);
    localStorage.setItem("step", "4.3");
  };

  const toggleForwarding = async () => {
    const groupId = groupIdArray[groupIndex];
    let repostTargetId = 0;

    await fetch(`https://bize.work/api/org/${orgId}/group/${groupId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      }).then(obj => {
        console.log(obj);
        repostTargetId = obj.repost_targets[0].target_id;
      })
      .then(() => {
        fetch(`https://bize.work/api/org/${orgId}/group/${groupId}/repost_target/${repostTargetId}`,
          {
            method: "PUT",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              repost: forwarding,
            }),
          })
          .then(resp => {
          if (resp.status >= 200 && resp.status < 300) {
            return resp.json()
          } else {
            throw Error(resp.statusText);
          }
        })
          .then(obj => {
            console.log(obj);
            setForwarding(!forwarding);
            setStep(4.3);
            localStorage.setItem("step", "4.3");
          })
          .catch(error => {
            console.error(error);
          });
      })
  };

  const setFile = async () => {
    const scenarioId = scenarioIdArray[scenarioIndex];
    const taskId = taskIdArray[taskIndex];

    await fetch(`https://bize.work/api/org/${orgId}/scenario/${scenarioId}/task/${taskId}/question/create/file`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then((obj) => {
        console.log(obj);
        setQuestionId(obj.question_id);
        localStorage.setItem("question_id", JSON.stringify(obj.question_id));
        setStep(7.1);
        localStorage.setItem("step", "7.1");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const groupTarget = async (event) => {
    event.preventDefault();

    const groupId = groupIdArray[groupIndex];

    await fetch(`https://bize.work/api/org/${orgId}/group/${groupId}`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goal: groupTargetValue }),
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then(obj => {
        console.log(obj);
        setGroupTargetValue("");
        setStep(4.3);
        localStorage.setItem("step", "4.3");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const setEmployeeTarget = async (event) => {
    event.preventDefault();

    const groupId = groupIdArray[groupIndex];
    const memberId = employeeArray[employeeNumber - 1].member_id;

    await fetch(`https://bize.work/api/org/${orgId}/group/${groupId}/member/${memberId}`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goal: employeeTargetValue }),
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then(obj => {
        console.log(obj);
        setStep(4.3);
        localStorage.setItem("step", "4.3");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const setAIAnalysis = async (event) => {
    event.preventDefault();

    const groupId = groupIdArray[groupIndex];

    await fetch(`https://bize.work/api/org/${orgId}/group/${groupId}/ai_analysis`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goal: AIAnalysisValue }),
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then(obj => {
        console.log(obj);
        setAnalysisValue(obj.analysis);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const setScenarioGroup = async (index) => {
    const groupId = groupIdArray[groupIndex];
    const scenarioId = scenarioIdArray[index];

    await fetch(`https://bize.work/api/org/${orgId}/group/${groupId}/assign_scenario`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scenario_id: scenarioId }),
    })
      .then(resp => {
        if (resp.status >= 200 && resp.status < 300) {
          return resp.json()
        } else {
          throw Error(resp.statusText);
        }
      })
      .then(obj => {
        console.log(obj);
        setActiveScenario(obj.name);
        localStorage.setItem("active_scenario", JSON.stringify(obj.name));
        setStep(4.3);
        localStorage.setItem("step", "4.3");
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="App container">
      {step === 1 && <div>
        <Button type="button" variant="contained" onClick={() => setStep(2)}>Створити організацію</Button><br/>
        {/*<Button type="button" variant="contained" onClick={() => setStep(3)}>Приєднатись до організації</Button><br/>*/}
        {/*<Button type="button" variant="contained" onClick={backdoor}>Go backdoor</Button>*/}
      </div>}
      {step === 2 && <div>
        <form method="POST" action="#" onSubmit={(event) => {
          void createCompany(event)
        }}>
          <TextField label="Введіть назву організації" onChange={(event) => setOrgName(event.target.value)}/><br/>
          <ButtonComponent/><br/>
          <Button type="button" variant="outlined" onClick={() => setStep(1)}>Назад</Button>
        </form>
      </div>}
      {/*{step === 3 && <div>
        <form method="POST" action="#" onSubmit={(event) => {void enterKey(event)}}>
          <TextField label="Введіть ключ запрошення"/>
          <ButtonComponent/>
        </form>
      </div>}*/}
      {step === 4 && <div>
        <Button type="button" variant="contained" onClick={() => setStep(5)}>UTC</Button><br/>
        <Button type="button" variant="contained" onClick={() => setStep(6)}>Сценарій</Button><br/>
        <Button type="button" variant="contained" onClick={() => setStep(4.1)}>Доступ</Button><br/>
        <Button type="button" variant="contained" onClick={() => deleteCompany()}>Видалити і покинути</Button>
      </div>}
      {step === 4.1 && <div>
        {!groupNamesArray.length > 0 ? <p>Організація не має груп</p> : ""}
        <Button type="button" variant="contained" onClick={() => setStep(4.2)}>Створити групу</Button><br/>
        <ul>
          {groupNamesArray.length > 0 && groupNamesArray.map((item, index) => (
            <li key={index}><Button type="button" variant="contained" onClick={() => setGroup(index)}>{index + 1}: {item}</Button><br/></li>))}
        </ul>
        {groupNamesArray.length > 0 && <><Button type="button" variant="contained" onClick={() => setStep(4.21)}>Видалити групу</Button><br/></>}
        <Button type="button" variant="outlined" onClick={() => setStep(4)}>Назад</Button>
      </div>}
      {step === 4.2 && <div>
        <form action="#" method="POST" onSubmit={(event) => {
          void enterNewGroup(event)
        }}>
          <TextField label="Введіть назву нової групи" onChange={(event) => setNewGroupName(event.target.value)}/><br/>
          <ButtonComponent/><br/>
          <Button type="button" variant="outlined" onClick={() => {
            setStep(4.1);
            localStorage.setItem("step", "4.1")
          }}>Назад</Button>
        </form>
      </div>}
      {step === 4.21 && <div>
        <p>Надішліть номер групи для видалення:</p>
        <ul>
          {groupNamesArray.map((item, index) => <li key={index}>{index + 1}: {item}</li>)}
        </ul>
        <form action="#" method="POST" onSubmit={(event) => void deleteGroup(event)}>
          <TextField label="" onChange={(event) => setGroupIndex(Number(event.target.value))}/><br/>
          <ButtonComponent/><br/>
          <Button type="button" variant="outlined" onClick={() => {
            setStep(4.1);
            localStorage.setItem("step", "4.1");
          }}>Назад</Button>
        </form>
      </div>}
      {step === 4.3 && <div>
        {groupNamesArray.length > 0 &&<p>Група: {groupNamesArray[groupIndex]}</p>}
        {employeeArray.length > 0 && <div>
          <p>Учасники:</p>
          <ul>
            {employeeArray.map((user, index) => (<li key={index}>{index+1}) {user.name}, {user.invitation_key}</li>))}
          </ul>
        </div>}
        {activeScenario.length > 0 && <p>Призначений сценарій: {activeScenario}</p>}
        <Button type="button" variant="contained" onClick={() => setStep(4.42)}>Цілі та висновки</Button><br/>
        <Button type="button" variant="contained" onClick={() => setStep(4.41)}>Налаштувати пересилку</Button><br/>
        <Button type="button" variant="contained" onClick={() => setStep(4.44)}>Видалити співробітника</Button><br/>
        <Button type="button" variant="contained" onClick={() => setStep(4.43)}>Додати співробітника</Button><br/>
        <Button type="button" variant="contained" onClick={() => setStep(4.45)}>Закріпити сценарій</Button><br/>
        <Button type="button" variant="outlined" onClick={() => setStep(4.1)}>Назад</Button>
      </div>}
      {step === 4.41 && <div>
        <Button type="button" variant="contained" onClick={() => toggleForwarding()}>{forwarding ? "Вимкнути" : "Увімкнути"} собі</Button><br/>
        <Button type="button" variant="outlined" onClick={() => setStep(4.3)}>Назад</Button>
      </div>}
      {step === 4.42 && <div>
        <Button type="button" variant="contained" onClick={() => setStep(4.421)}>Змінити ціль групи</Button><br/>
        <Button type="button" variant="contained" onClick={() => setStep(4.422)}>Змінити ціль участника</Button><br/>
        <Button type="button" variant="contained" onClick={() => setStep(4.424)}>Аналіз успішності</Button><br/>
        <Button type="button" variant="outlined" onClick={() => setStep(4.3)}>Назад</Button>
      </div>}
      {step === 4.421 && <div>
        <p>Надішліть ціль для групи "{groupNamesArray[groupIndex]}"</p>
        <form action="#" method="PUT" onSubmit={(event) => void groupTarget(event)}>
          <TextField label="" onChange={(event) => setGroupTargetValue(event.target.value)} value={groupTargetValue}/><br/>
          <ButtonComponent/>
        </form>
        <Button type="button" variant="outlined" onClick={() => setStep(4.42)}>Назад</Button>
      </div>}
      {step === 4.422 && <div>
        <p>Надішліть номер учасника, якому ви бажаєте змінити ціль.</p>
        <span>Список учасників:</span>
        <ul>
          {employeeArray.length > 0 && employeeArray.map((user, index) => <li key={index}>{index + 1}: {user.name}</li>)}
        </ul>
        <TextField label="" onChange={(event) => setEmployeeNumber(Number(event.target.value))}/><br/>
        <Button type="button" variant="outlined" onClick={() => setStep(4.423)}>Далі</Button>
      </div>}
      {step === 4.423 && <div>
        <p>Вибрано учасника {employeeArray[employeeNumber - 1].name}. Надішліть ціль для учасника.</p>
        <form action="#" onSubmit={(event) => void setEmployeeTarget(event)}>
          <TextField label="" onChange={(event) => setEmployeeTargetValue(event.target.value)} value={employeeTargetValue}/><br/>
          <ButtonComponent/>
        </form>
        <Button type="button" variant="outlined" onClick={() => setStep(4.42)}>Назад</Button>
      </div>}
      {step === 4.424 && <div>
        <p>Надішліть опис очікувань по проекту для аналізу успішності "{groupNamesArray[groupIndex]}" за "{year}-{month}-{day}"</p>
        <form action="#" method="POST" onSubmit={(event) => void setAIAnalysis(event)}>
          <TextField label="" onChange={(event)=> setAIAnalysisValue(event.target.value)}/><br/>
          <ButtonComponent/><br/>
        </form>
        {analysisValue.length > 0 && <div className="wrapper">
          <p>
            {analysisValue}
          </p>
        </div>}
        <Button type="button" variant="outlined" onClick={() => setStep(4.3)}>Назад</Button>
      </div>}
      {step === 4.43 && <div>
        <form action="#" method="POST" onSubmit={(event) => {
          void addEmployee(event)
        }}>
          <TextField label="Надішліть ім'я співробітника, якого хочете додати" onChange={(event) => setEmployee(event.target.value)}/><br/>
          <ButtonComponent/><br/>
          <Button type="button" variant="outlined" onClick={() => setStep(4.3)}>Назад</Button>
        </form>
      </div>}
      {step === 4.44 && <div>
        <form action="#" method="DELETE" onSubmit={(event) => {
          void deleteEmployee(event)
        }}>
          <p>Надішліть номер співробітника для видалення:</p>
          <ul>
            {employeeArray.map((obj, index) => <li key={index}>{index + 1}: {obj.name}</li>)}
          </ul>
          <TextField label="" onChange={(event) => setEmployeeNumber(Number(event.target.value))}/><br/>
          <ButtonComponent sx={{marginBottom: "10px"}}/><br/>
          <Button type="button" variant="outlined" onClick={() => setStep(4.3)}>Назад</Button>
        </form>
      </div>}
      {step === 4.45 && <div>
        <p>Оберіть сценарій для призначення групі {groupNamesArray[groupIndex]}</p>
        <ul>
          {scenarioNameArray.length > 0 && scenarioNameArray.map((scenario, index) => <li key={index}><Button type="button" variant="contained"
                                                                                                  onClick={()=> setScenarioGroup(index)}>{scenario}</Button></li>)}
        </ul>
        <Button type="button" variant="outlined" onClick={() => setStep(4.3)}>Назад</Button>
      </div>}
      {step === 5 && <div>
        <p>Оберіть часовий пояс для організації (UTC). Введіть в форматі числа. Наприклад: +2, -2, або просто 2</p>
        <form method="POST" action="#" onSubmit={(event) => void setUTC(event)}>
          <TextField label="Введіть число" onChange={(event) => setTimeZone(event.target.value)}/><br/>
          <ButtonComponent/>
        </form>
      </div>}
      {step === 6 && <div>
        <Button type="button" variant="contained" onClick={() => setStep(7)}>Створити сценарій</Button><br/>
        <ul>
          {scenarioNameArray.length > 0 && scenarioNameArray.map((item, index) => <li key={index}><Button type="button" variant="contained"
                                                                                                          onClick={() => selectScenario(index)}>{index + 1}: {item}</Button>
                                                                                          </li>)}
        </ul>
        {scenarioNameArray.length > 0 && <><Button type="button" variant="contained" onClick={() => setStep(7.25)}>Видалити сценарій</Button><br/></>}
        <Button type="button" variant="outlined" onClick={() => setStep(4)}>Назад</Button>
      </div>}
      {step === 7 && <div>
        <form action="#" method="POST" onSubmit={(event) => void setScenario(event)}>
          <TextField label="Введіть назву сценарію" onChange={(event) => setScenarioName(event.target.value)}/><br/>
          <ButtonComponent/><br/>
        </form>
        <Button type="button" variant="outlined" onClick={() => setStep(6)}>Назад</Button>
      </div>}
      {step === 7.1 && <div>
        <ul>
          {taskArray.length > 0 && taskArray.map((item, index) => <li key={index}>{item.start}-{item.end} {item.description}</li>)}
        </ul>
        <Button type="button" variant="contained" onClick={() => setStep(7.2)}>Редагувати назву сценарію</Button><br/>
        <Button type="button" variant="contained" onClick={() => setStep(7.3)}>Створити задачу</Button><br/>

        <Button type="button" variant="contained" onClick={() => setStep(7.4)}>Видалити задачу</Button><br/>
        <Button type="button" variant="outlined" onClick={() => setStep(6)}>Назад</Button>
      </div>}
      {step === 7.2 && <div>
        <form action="#" method="POST" onSubmit={(event) => void changeScenarioName(event)}>
          <TextField label="Введіть назву сценарію" onChange={(event) => setScenarioName(event.target.value)}/><br/>
          <ButtonComponent/><br/>
        </form>
        <Button type="button" variant="outlined" onClick={() => setStep(6)}>Назад</Button>
      </div>}
      {step === 7.25 && <div>
        <p>Введіть номер сценарію, який хочете видалити:</p>
        <ul>
          {scenarioNameArray.length > 0 && scenarioNameArray.map((item, index) => <li key={index}>{index + 1}: {item}</li>)}
        </ul>
        <form action="#" method="DELETE" onSubmit={(event) => void deleteScenario(event)}>
          <TextField label="" onChange={(event) => setScenarioIndex(Number(event.target.value))}/><br/>
          <ButtonComponent/>
        </form>
        <Button type="button" variant="outlined" onClick={() => setStep(6)}>Назад</Button>
      </div>}
      {step === 7.3 && <div>
        <p>Введіть час старту завдання. Наприклад 17:15, або просто 17</p>
        <TextField label="Введіть час старту завдання" onChange={event => setStartTask(event.target.value)}/><br/>
        <Button type="button" variant="outlined" onClick={() => enterStartTask()}>Далі</Button><br/>
        <Button type="button" variant="outlined" onClick={() => setStep(7.1)}>Назад</Button>
      </div>}
      {step === 7.31 && <div>
        <p>Введіть час завершення завдання. Наприклад 18:15</p>
        <TextField label="Введіть час завершення завдання" onChange={(event) => setEndTask(event.target.value)}/><br/>
        <Button type="button" variant="outlined" onClick={() => enterEndTask()}>Далі</Button><br/>
        <Button type="button" variant="outlined" onClick={() => setStep(7.1)}>Назад</Button>
      </div>}
      {step === 7.32 && <div>
        <form action="#" method="POST" onSubmit={(event) => void enterDescription(event)}>
          <TextField label="Опишіть завдання" onChange={(event) => setTaskDescription(event.target.value)}/><br/>
          <ButtonComponent/>
        </form>
        <Button type="button" variant="outlined" onClick={() => setStep(7.31)}>Назад</Button>
      </div>}
      {step === 7.33 && <div>
        <p>Виберіть форму відповіді користувача</p>
        <Button type="button" variant="contained" onClick={() => enterQuestionText()}>Текст</Button><br/>
        <Button type="button" variant="contained" onClick={() => setStep(7.332)}>Один зі списку</Button><br/>
        <Button type="button" variant="contained" onClick={() => setStep(7.334)}>Декілька зі списку</Button><br/>
        <Button type="button" variant="contained" onClick={setFile}>Файл</Button>
      </div>}
      {step === 7.331 && <div>
        <Button type="button" variant="contained" onClick={() => setStep(7.33)}>Додати інший тип відповіді</Button><br/>
        <Button type="submit" variant="contained" onClick={() => {
          setStep(7.1);
          localStorage.setItem("step", "7.1")
        }}>Зберегти задачу</Button>
      </div>}
      {step === 7.332 && <div>
        <form action="#" method="POST" onSubmit={(event) => void enterSingleChoice(event)}>
          <TextField label="Опишіть варіант відповіді" onChange={(event) => setChoiceItem(event.target.value)} value={choiceItem}/><br/>
          <Button type="button" variant="contained" onClick={setChoice}>Додати пункт (для списку)</Button><br/>
          {choicesArray.length > 1 && <ButtonComponent/>}
        </form>
      </div>}
      {step === 7.333 && <div>
        <Button type="button" variant="contained" onClick={() => setStep(7.332)}>Додати пункт (для списку)</Button><br/>
        <Button type="button" variant="contained" onClick={() => setStep(7.33)}>Додати інший тип відповіді</Button><br/>
        <Button type="button" variant="contained" onClick={() => setStep(7.1)}>Зберегти задачу</Button>
      </div>}
      {step === 7.334 && <div>
        <form action="#" method="POST" onSubmit={(event) => void enterMultipleChoice(event)}>
          <TextField label="Опишіть варіант відповіді" onChange={(event) => setMultiChoiceItem(event.target.value)} value={multiChoiceItem}/><br/>
          <Button type="button" variant="contained" onClick={setMultiChoice}>Додати пункт (для списку)</Button><br/>
          {multiChoiceArray.length > 1 && <ButtonComponent/>}
        </form>
      </div>}
      {step === 7.4 && <div>
        <p>Введіть номер завдання, яке хочете видалити:</p>
        {taskArray.length > 0 && taskArray.map((item, index) => <p key={index}>{index + 1}: {item.start}-{item.end} {item.description}</p>)}
        <form action="#" method="POST" onSubmit={(event) => deleteTask(event)}>
          <TextField label="" onChange={(event) => setTaskIndex(Number(event.target.value))}/><br/>
          <ButtonComponent/>
        </form>
        <Button type="button" variant="outlined" onClick={() => setStep(7.1)}>Назад</Button>
      </div>}
    </div>
  );
}