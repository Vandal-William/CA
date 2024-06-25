import React, { useState, useEffect } from 'react';
import user from '../../../selectors/user';
import subscription from '../../../selectors/subscription';
import userSubscription from '../../../selectors/userSubscription';
import revenue from '../../../selectors/revenu';
import { UserData } from '../../../interface/UserData';
import { SubscriptionData } from '../../../interface/SubscriptionData';
import { UserSubscriptionData } from '../../../interface/UserSubscriptionData';
import { RevenuData } from '../../../interface/RevenuData';
import './style.css';



const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [userSubscriptions, setUserSubscriptions] = useState<UserSubscriptionData[]>([]);
  const [revenues, setrevenues] = useState<RevenuData[]>([]);
  const [year, setYear] = useState<string>('Year');
  const [year2, setYear2] = useState<string>('Year');
  const [month, setmonth] = useState<string | null>('Month');
  const [numberOfMonth, setNumberOfMonth] = useState<number>();
  const [month2, setmonth2] = useState<string | null>('Month');
  const [numberOfMonth2, setNumberOfMonth2] = useState<number>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isDisabled2, setIsDisabled2] = useState<boolean>(true);

  const revenue1 = revenues
                    .filter(rev => year !== 'Year' && new Date(rev.date).getFullYear() === parseInt(year, 10) && (month === 'Month' || new Date(rev.date).getMonth() + 1 === numberOfMonth))
                    .reduce((sum, rev) => sum + rev.amount, 0).toFixed(2);
  const revenue2 = revenues
                    .filter(rev => year2 !== 'Year' && new Date(rev.date).getFullYear() === parseInt(year2, 10) && (month2 === 'Month' || new Date(rev.date).getMonth() + 1 === numberOfMonth2))
                    .reduce((sum, rev) => sum + rev.amount, 0).toFixed(2);

  const diff = parseInt(revenue2) - parseInt(revenue1);

  const inactiveUsers = userSubscriptions.filter(us => (us.status === 'Inactive')).length;

  const months = [
    { name: 'Month', value: 0 },
    { name: 'Janvier', value: 1 },
    { name: 'Février', value: 2 },
    { name: 'Mars', value: 3 },
    { name: 'Avril', value: 4 },
    { name: 'Mai', value: 5 },
    { name: 'Juin', value: 6 },
    { name: 'Juillet', value: 7 },
    { name: 'Août', value: 8 },
    { name: 'Septembre', value: 9 },
    { name: 'Octobre', value: 10 },
    { name: 'Novembre', value: 11 },
    { name: 'Décembre', value: 12 },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allUsers = await user.fetchAll();
        const allSubscriptions = await subscription.fetchAll();
        const allUserSubscriptions = await userSubscription.fetchAll();
        const allRevenues = await revenue.fetchAll();
        setUsers(allUsers);
        setSubscriptions(allSubscriptions);
        setUserSubscriptions(allUserSubscriptions);
        setrevenues(allRevenues);
      } catch (error) {
        console.error('Erreur lors de la récupération des categories :', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="dashboard">
        <div className='flex'>
          <div className='dashboard-card unique'>
            <h2>{users.length}</h2>
            <span>Users</span>
          </div>
          <div className='dashboard-subscription-container dashboard-card'>
            <h2>Subscriptions</h2>
            {subscriptions.map(sub => (
              <div>
                <h1>{((userSubscriptions.filter(us => (us.subscriptionId === sub.id)).length / users.length) * 100).toFixed(0)}%</h1>
                <span>{sub.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='flex'>
          <div className='dashboard-subscription-container dashboard-card'>
            <h2>Users's status</h2>
              <div>
                <h1>{((userSubscriptions.filter(us => (us.status === 'Active')).length / users.length)*100).toFixed(0)}%</h1>
                <span>Active</span>
              </div>
              <div>
                <h1>{((userSubscriptions.filter(us => (us.status === 'Inactive')).length / users.length)*100).toFixed(0)}%</h1>
                <span>Inactive</span>
              </div>
          </div>
          <div className='dashboard-subscription-container dashboard-card'>
            <h2>Inactive reason</h2>
              <div>
                <h1>{((userSubscriptions.filter(us => (us.reason === 'PaymentDefault')).length / inactiveUsers)*100).toFixed(0)}%</h1>
                <span>PaymentDefault</span>
              </div>
              <div>
                <h1>{((userSubscriptions.filter(us => (us.reason === 'Unsubscription')).length / inactiveUsers)*100).toFixed(0)}%</h1>
                <span>Unsubscription</span>
              </div>
          </div>
        </div>
        <div className='flex other'>
          <h3>Revenues</h3>
          <div className='revenus-form-container'>
            <select name='years' className='revenus-select' onChange={(e) => {setYear(e.target.value); e.target.value !== 'Year' ? setIsDisabled(false) : setIsDisabled(true)}}>
              <option value="Year">Year</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <select disabled={isDisabled} className='revenus-select' onChange={(e) => { year !== 'Year' ? setmonth(months[parseInt(e.target.value)].name) : 'Month'; setNumberOfMonth(parseInt(e.target.value))}}>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.name}
                </option>
              ))}
            </select>
          </div>
        </div>
          <div className='flex'>
            <div className='dashboard-card unique'>
              <h1>{year ? year : 'year'}</h1>
              <span>{month ? month : 'month'}</span>
            </div>
            <div className='dashboard-subscription-container dashboard-card'>
              <h1>{revenue1}€</h1>  
            </div>
          </div>
          <div className='flex other'>
            <h3>Revenues</h3>
            <div className='revenus-form-container'>
              <select name='years' className='revenus-select' onChange={(e) => {setYear2(e.target.value); e.target.value !== 'Year' ? setIsDisabled2(false) : setIsDisabled2(true)}}>
                <option value="Year">Year</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
              <select disabled={isDisabled2} className='revenus-select' onChange={(e) => { year2 !== 'Year' ? setmonth2(months[parseInt(e.target.value)].name) : 'Month'; setNumberOfMonth2(parseInt(e.target.value))}}>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.name}
                  </option>
                ))}
              </select>
            </div>
            <h4>Difference : {diff} € </h4>
          </div>
          <div className='flex'>
            <div className='dashboard-card unique'>
              <h1>{year2 ? year2 : 'year'}</h1>
              <span>{month2 ? month2 : 'month'}</span>
            </div>
            <div className='dashboard-subscription-container dashboard-card'>
              <h1>{revenue2}€
                </h1>  
            </div>
          </div>
        
    </div>
  );
};

export default Dashboard;
