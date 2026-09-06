import type {Project} from './projects';

export const contributions=[
  {id:'design',number:'01',title:'Design & engineering',description:'Design consultancy and detailed engineering.'},
  {id:'bid',number:'02',title:'Bid & budget support',description:'Engineering input for bids and project budgeting.'},
  {id:'review',number:'03',title:'Review & proof checking',description:'Independent checking and proof consultancy.'},
  {id:'management',number:'04',title:'Project management',description:'Assignments with a stated management scope.'},
] as const;
export type ContributionId=typeof contributions[number]['id'];
export function contributionFor(project:Project){
  const role=project.role.toLowerCase();
  const id:ContributionId=role.includes('project management')?'management':role.includes('proof')?'review':role.includes('pre-bid')||role.includes('pre-budget')?'bid':'design';
  return contributions.find(contribution=>contribution.id===id)!;
}
