
 /* function vote(item, type, button) {
  const section = button.closest('section');
  section.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  const votes = JSON.parse(localStorage.getItem('votes') || '{}');
  votes[item] = type;
  localStorage.setItem('votes', JSON.stringify(votes));

  console.log(`Voted ${type} for ${item}`);
} */ 

/*
function vote(item, type, button) {
  const section = button.closest('section');
  const upCountEl = section.querySelector('.upvote-count');
  const downCountEl = section.querySelector('.downvote-count');

  const votes = JSON.parse(localStorage.getItem('votes') || '{}');

  // Prevent double voting: subtract previous vote
  if (votes[item]) {
    if (votes[item] === 'up') {
      votes[item + '-upCount'] = (votes[item + '-upCount'] || 1) - 1;
    } else {
      votes[item + '-downCount'] = (votes[item + '-downCount'] || 1) - 1;
    }
  }

  // Record new vote
  votes[item] = type;
  if (type === 'up') {
    votes[item + '-upCount'] = (votes[item + '-upCount'] || 0) + 1;
  } else {
    votes[item + '-downCount'] = (votes[item + '-downCount'] || 0) + 1;
  }

  localStorage.setItem('votes', JSON.stringify(votes));

  // Update displayed counters
  upCountEl.textContent = votes[item + '-upCount'] || 0;
  downCountEl.textContent = votes[item + '-downCount'] || 0;

  // Highlight active vote
  section.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  console.log(`Voted ${type} for ${item}`);
}

// Initialize counters when page loads
window.addEventListener('load', () => {
  const votes = JSON.parse(localStorage.getItem('votes') || '{}');
  document.querySelectorAll('section').forEach(section => {
    const item = section.dataset.item;
    if (!item) return;
    const upCountEl = section.querySelector('.upvote-count');
    const downCountEl = section.querySelector('.downvote-count');
    if (upCountEl) upCountEl.textContent = votes[item + '-upCount'] || 0;
    if (downCountEl) downCountEl.textContent = votes[item + '-downCount'] || 0;

    // Highlight previously voted button
    if (votes[item]) {
      section.querySelector(`button.${votes[item]}vote`)?.classList.add('active');
    }
  });
});  */

 function vote(item, type, button) {
    const section = button.closest('section');
    const upCountEl = section.querySelector('.upvote-count');
    const downCountEl = section.querySelector('.downvote-count');
    const votes = JSON.parse(sessionStorage.getItem('votes') || '{}');

    // Prevent multiple votes for the same item per window session
    if (votes[item]) {
      alert("You can only vote once for this item during this session!");
      return;
    }

    // Record new vote
    votes[item] = type;
    votes[item + '-upCount'] = votes[item + '-upCount'] || 0;
    votes[item + '-downCount'] = votes[item + '-downCount'] || 0;

    if (type === 'up') {
      votes[item + '-upCount'] += 1;
    } else {
      votes[item + '-downCount'] += 1;
    }

    sessionStorage.setItem('votes', JSON.stringify(votes));

    // Update counters
    upCountEl.textContent = votes[item + '-upCount'] || 0;
    downCountEl.textContent = votes[item + '-downCount'] || 0;

    // Highlight button and disable both
    section.querySelectorAll('button').forEach(btn => btn.disabled = true);
    button.classList.add('active');
  }

  // Initialize counters on load
  window.addEventListener('load', () => {
    const votes = JSON.parse(sessionStorage.getItem('votes') || '{}');
    document.querySelectorAll('section[data-item]').forEach(section => {
      const item = section.dataset.item;
      const upCountEl = section.querySelector('.upvote-count');
      const downCountEl = section.querySelector('.downvote-count');
      if (upCountEl) upCountEl.textContent = votes[item + '-upCount'] || 0;
      if (downCountEl) downCountEl.textContent = votes[item + '-downCount'] || 0;

      // Disable buttons if user already voted
      if (votes[item]) {
        section.querySelectorAll('button').forEach(btn => btn.disabled = true);
        section.querySelector(`button.${votes[item]}vote`)?.classList.add('active');
      }
    });
  });

