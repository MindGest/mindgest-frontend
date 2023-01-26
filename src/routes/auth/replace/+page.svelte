<script>
  import Button from "$lib/components/Button.svelte";
    import TextBox from "$lib/components/TextBox.svelte";
    let email = "";
    let password = "";
    let confirm = "";

    async function resetPassword(email, password, confirm) {
        alert(`${email}, ${password}, ${confirm}`)
        //TODO: Integrate
    }
</script>


<div class="block justify-items-center text-center m-10">
    <h1 class="text-4xl font-bold m-10">Replace Password</h1>
    <form on:submit|preventDefault={async () => await resetPassword(email, password, confirm) }>
        <TextBox class="w-1/3 my-5 m-auto" label="email" bind:value={email} />
        <TextBox class="w-1/3 my-5 m-auto" label="password" bind:value={password} />
        <TextBox class="w-1/3 my-5 m-auto" label="Confirmar password" bind:value={confirm} />
        <Button class="w-1/3 my-20 m-auto" text="submit" type="submit" />
    </form>
</div>
