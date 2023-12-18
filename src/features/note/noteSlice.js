import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: true,
    notes: [],
    error: ''
}

export const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
    try {
        const res = await axios.get("http://localhost:5000/notes");
        return res.data.notes
    } catch (error) {
        throw error
    }
});


const noteSlice = createSlice({
    name:"note",
    initialState,
    extraReducers: (buider) => {
        buider
        .addCase(fetchNotes.pending, state => {
            state.loading = true
        })
        .addCase(fetchNotes.fulfilled, (state, action) => {
            state.loading = false
            state.notes = action.payload
            state.error = ""
        })
        .addCase(fetchNotes.rejected, (state, action) => {
            state.loading = false
            state.notes = []
            state.error = action.error.message || 'Failed to fetch users.'
        })
    }
})

export default noteSlice.reducer;






// import axios from "axios";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//     loading: true,
//     notes: [],
//     error: ''
// };


// export const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
//     try {
//         const response = await axios.get("http://localhost:5000/notes");
//         return response.data.notes;
//     } catch (error) {
//         throw error;
//     }
// });

// const noteSlice = createSlice({
//     name: "note",
//     initialState,
//     extraReducers: builder => {
//         builder
//             .addCase(fetchNotes.pending, state => {
//                 state.loading = true;
//             })
//             .addCase(fetchNotes.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.notes = action.payload;
//                 state.error = "";
//             })
//             .addCase(fetchNotes.rejected, (state, action) => {
//                 state.loading = false;
//                 state.notes = [];
//                 state.error = action.error.message; // Corrected typo here
//             });
//     }
// });

// export default noteSlice.reducer;
 