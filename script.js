let currentMode = 'quiz';

function showMode(mode){
  currentMode = mode;
  renderTopics();
}

function renderTopics(){
  const topicsDiv = document.getElementById('topics');
  topicsDiv.innerHTML='';

  for(let topic in questionBank){
    const wrapper=document.createElement('div');
    wrapper.className='topic-card';

    const title=document.createElement('h2');
    title.innerText=topic;
    title.style.cursor='pointer';

    const content=document.createElement('div');
    content.className='hidden';

    title.onclick=()=>{
      content.classList.toggle('hidden');
    };

    if(currentMode==='quiz'){
      questionBank[topic].quiz.forEach(q=>{
        const box=document.createElement('div');
        box.className='question-box';
        box.innerHTML=`<h3>${q.q}</h3>`;

        if(q.type==='mcq'){
          const answers=document.createElement('div');
          answers.className='answers';
          q.options.forEach((opt,idx)=>{
            const btn=document.createElement('button');
            btn.innerText=opt;
            btn.onclick=()=>{
              if(idx===q.answer) btn.classList.add('correct');
              else btn.classList.add('wrong');
            };
            answers.appendChild(btn);
          });
          box.appendChild(answers);
        } else {
          box.innerHTML+=`<p><strong>${q.command||''} (${q.marks||''} marks)</strong></p>`;
          box.innerHTML+=`<textarea placeholder='Write your answer here...'></textarea>`;
        }
        content.appendChild(box);
      });
    } else {
      questionBank[topic].flashcards.forEach(card=>{
        const div=document.createElement('div');
        div.className='flashcard';
        div.innerText=card.front;
        div.onclick=()=>{
          div.innerText = div.innerText===card.front ? card.back : card.front;
        };
        content.appendChild(div);
      });
    }

    wrapper.appendChild(title);
    wrapper.appendChild(content);
    topicsDiv.appendChild(wrapper);
  }
}

renderTopics();
