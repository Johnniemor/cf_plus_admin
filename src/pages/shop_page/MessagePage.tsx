// import Table from '@/components/Table';
// import { messageHeader } from './column/Header';
// import useMessageHook from '@/hooks/message/useMessageHook';
// import { useEffect } from 'react';

// const MessagePageAll: React.FC = () => {
//   const { getMessageHook, message, queryParams } = useMessageHook();

//   useEffect(() => {
//     getMessageHook(queryParams);
//   }, []);
//   return (
//     <div>
//       <Table
//         header={messageHeader}
//         data={message}
//         body={
//           <>
//             {message.map((msg, index) => (
//               <tr className="border-b border-gray-300" key={index}>
//                 <td className="p-4 text-black dark:text-white">{index + 1}</td>
//                 <td className="p-4 text-black dark:text-white">
//                   <img
//                     className="h-14 w-14 rounded-full"
//                     src={msg.page_id.picture.data.url || '/src/assets/logo/default_img.png'}
//                     alt="picture"
//                   />
//                 </td>
//                 <td className="p-4 text-black dark:text-white">{msg.page_id.name}</td>
//                 <td className="p-4 text-black dark:text-white">{msg.header}</td>
//                 <td className="p-4 text-black dark:text-white">{msg.footer}</td>
//                 <td className="p-4 text-black dark:text-white">{new Date(msg.created).toLocaleTimeString()}</td>
//               </tr>
//             ))}
//           </>
//         }
//         loading={false}
//         children={undefined}
//       />
//     </div>
//   );
// };

// export default MessagePageAll;
