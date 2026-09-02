import { Card,CardActions,CardContent,Chip,IconButton,Stack,Typography } from '@mui/material';
import EditOutlined from '@mui/icons-material/EditOutlined'; import DeleteOutline from '@mui/icons-material/DeleteOutline';
const colors={HIGH:'error',MEDIUM:'warning',LOW:'success'};
export default function TicketCard({ticket,onEdit,onDelete}){return <Card variant="outlined" sx={{height:'100%',display:'flex',flexDirection:'column'}}>
 <CardContent sx={{flexGrow:1}}><Stack direction="row" justifyContent="space-between" gap={1}><Typography variant="h6" fontWeight={700}>{ticket.title}</Typography><Chip size="small" label={ticket.priority} color={colors[ticket.priority]}/></Stack>
 <Typography color="text.secondary" sx={{my:2,display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{ticket.description}</Typography>
 <Chip size="small" variant="outlined" label={ticket.status.replace('_',' ')}/></CardContent>
 <CardActions sx={{justifyContent:'flex-end'}}><IconButton aria-label="edit" onClick={()=>onEdit(ticket)}><EditOutlined/></IconButton><IconButton aria-label="delete" color="error" onClick={()=>onDelete(ticket.id)}><DeleteOutline/></IconButton></CardActions>
 </Card>}
