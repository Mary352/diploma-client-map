import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Box } from "@mui/material";
import { Footer } from "./Footer";
import { PosterPage } from "./PosterPage";
import { SignIn } from "./SignIn";
import { Account } from "./Account";
import { Register } from "./Register";
import { PosterCreatePage } from "./PosterCreatePage";
import { PosterUpdatePage } from "./PosterUpdatePage";
import { PostersUserList } from "./PostersUserList";
import { ErrorPage } from "./ErrorPage";
import { UsersList } from "./UsersList";
import { PostersListPage } from "./PostersListPage";

export const Navigation = () => {
   return <Box sx={{ boxSizing: 'border-box' }}>
      <Header />
      <Routes>
         <Route path="/">
            <Route index element={<PostersListPage />} />
         </Route>
         <Route path="/posters">
            <Route index element={<PostersListPage />} />
            <Route path="my" element={<PostersUserList />} />
            <Route path=":id" element={<PosterPage />} />
            <Route path="create" element={<PosterCreatePage />} />
            <Route path="update/:id" element={<PosterUpdatePage />} />
         </Route>
         <Route path="/signin" element={<SignIn />} />
         <Route path="/register" element={<Register />} />
         <Route path="/users">
            <Route index element={<UsersList />} />
            <Route path=":id" element={<Account />} />
         </Route>
         <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
   </Box>
}