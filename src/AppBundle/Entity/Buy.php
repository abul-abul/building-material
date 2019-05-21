<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Category
 *
 * @ORM\Table(name="buy")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Repository\BuyRepository")
 */
class Buy
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var
     * @ORM\Column(name="firstname", type="string", nullable=false)
     */
    protected $firstname;

    /**
     * @var
     * @ORM\Column(name="lastname", type="string", nullable=false)
     */
    protected $lastname;

    /**
     * @var
     * @ORM\Column(name="email", type="string", nullable=false)
     */
    protected $email;

    /**
     * @var
     * @ORM\Column(name="address", type="string", nullable=false)
     */
    protected $address;

    /**
     * @var
     * @ORM\Column(name="phone", type="text", nullable=false)
     */
    protected $phone;

    /**
     * @var
     * @ORM\Column(name="product_count", type="text", nullable=false)
     */
    protected $product_count;

    /**
     *
     * @ORM\ManyToOne(targetEntity="Product", inversedBy="buy")
     * @ORM\JoinColumn(name="product_id", referencedColumnName="id" )
     */
    protected $product;

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set firstname.
     *
     * @param string $firstname
     *
     * @return Buy
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
     * Get firstname.
     *
     * @return string
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * Set lastname.
     *
     * @param string $lastname
     *
     * @return Buy
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get lastname.
     *
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Set email.
     *
     * @param string $email
     *
     * @return Buy
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email.
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set address.
     *
     * @param string $address
     *
     * @return Buy
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address.
     *
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set phone.
     *
     * @param int $phone
     *
     * @return Buy
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone.
     *
     * @return int
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set product.
     *
     * @param \AppBundle\Entity\Product|null $product
     *
     * @return Buy
     */
    public function setProduct(\AppBundle\Entity\Product $product = null)
    {
        $this->product = $product;

        return $this;
    }

    /**
     * Get product.
     *
     * @return \AppBundle\Entity\Product|null
     */
    public function getProduct()
    {
        return $this->product;
    }

    /**
     * Set productCount.
     *
     * @param string $productCount
     *
     * @return Buy
     */
    public function setProductCount($productCount)
    {
        $this->product_count = $productCount;

        return $this;
    }

    /**
     * Get productCount.
     *
     * @return string
     */
    public function getProductCount()
    {
        return $this->product_count;
    }
}
